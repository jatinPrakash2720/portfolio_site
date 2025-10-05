'use client'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip'
import { cn } from '../../lib/utils'
import {
  ChevronDownIcon,
  TerminalIcon,
  NetworkIcon,
  XIcon,
  CopyIcon,
  DownloadIcon,
  PlayIcon,
  PauseIcon,
  RefreshCwIcon,
} from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

export interface ConsoleLog {
  id: string
  level: 'log' | 'warn' | 'error' | 'info'
  message: string
  timestamp: Date
  source?: string
  stack?: string
}

export interface NetworkRequest {
  id: string
  url: string
  method: string
  status?: number
  statusText?: string
  responseTime?: number
  timestamp: Date
  headers?: Record<string, string>
  responseHeaders?: Record<string, string>
  size?: number
  type?: string
}

export interface TerminalConsoleProps {
  className?: string
  onConsoleLog?: (log: ConsoleLog) => void
  onNetworkRequest?: (request: NetworkRequest) => void
  iframeRef?: React.RefObject<HTMLIFrameElement>
}

type TabType = 'console' | 'network'

export const TerminalConsole = ({
  className,
  onConsoleLog,
  onNetworkRequest,
  iframeRef,
}: TerminalConsoleProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('console')
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([])
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([])
  const [isRecording, setIsRecording] = useState(true)
  const [commandInput, setCommandInput] = useState('')
  const [filterText, setFilterText] = useState('')
  const [selectedLogLevel, setSelectedLogLevel] = useState<string>('all')

  const consoleEndRef = useRef<HTMLDivElement>(null)
  const networkEndRef = useRef<HTMLDivElement>(null)
  const requestIdCounter = useRef(0)

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (activeTab === 'console') {
      consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      networkEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [consoleLogs, networkRequests, activeTab])

  // Intercept console methods from iframe
  useEffect(() => {
    if (!iframeRef?.current || !isRecording) return

    const iframe = iframeRef.current
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframe.contentWindow) return

      try {
        const data = JSON.parse(event.data)

        if (data.type === 'console') {
          const log: ConsoleLog = {
            id: `${Date.now()}-${Math.random()}`,
            level: data.level || 'log',
            message: data.message || '',
            timestamp: new Date(),
            source: data.source || 'iframe',
            stack: data.stack,
          }

          setConsoleLogs((prev) => [...prev, log])
          onConsoleLog?.(log)
        } else if (data.type === 'network') {
          const request: NetworkRequest = {
            id: `${Date.now()}-${++requestIdCounter.current}`,
            url: data.url || '',
            method: data.method || 'GET',
            status: data.status,
            statusText: data.statusText,
            responseTime: data.responseTime,
            timestamp: new Date(),
            headers: data.headers,
            responseHeaders: data.responseHeaders,
            size: data.size,
            type: data.type,
          }

          setNetworkRequests((prev) => [...prev, request])
          onNetworkRequest?.(request)
        }
      } catch (error) {
        // Ignore non-JSON messages
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [iframeRef, isRecording, onConsoleLog, onNetworkRequest])

  // Inject console and network monitoring into iframe
  useEffect(() => {
    if (!iframeRef?.current || !isRecording) return

    const iframe = iframeRef.current
    const script = `
      (function() {
        // Console monitoring
        const originalConsole = {
          log: console.log,
          warn: console.warn,
          error: console.error,
          info: console.info
        };

        ['log', 'warn', 'error', 'info'].forEach(method => {
          console[method] = function(...args) {
            originalConsole[method].apply(console, args);
            
            const message = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            
            window.parent.postMessage(JSON.stringify({
              type: 'console',
              level: method,
              message: message,
              source: 'iframe',
              stack: new Error().stack
            }), '*');
          };
        });

        // Network monitoring
        const originalFetch = window.fetch;
        const originalXHROpen = XMLHttpRequest.prototype.open;
        const originalXHRSend = XMLHttpRequest.prototype.send;

        // Monitor fetch requests
        window.fetch = function(...args) {
          const startTime = Date.now();
          const url = args[0];
          const options = args[1] || {};
          
          return originalFetch.apply(this, args)
            .then(response => {
              const endTime = Date.now();
              const clonedResponse = response.clone();
              
              // Get response headers
              const responseHeaders = {};
              response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
              });
              
              // Get response size
              clonedResponse.text().then(text => {
                window.parent.postMessage(JSON.stringify({
                  type: 'network',
                  url: url,
                  method: options.method || 'GET',
                  status: response.status,
                  statusText: response.statusText,
                  responseTime: endTime - startTime,
                  headers: options.headers || {},
                  responseHeaders: responseHeaders,
                  size: new Blob([text]).size,
                  type: response.type
                }), '*');
              });
              
              return response;
            })
            .catch(error => {
              const endTime = Date.now();
              window.parent.postMessage(JSON.stringify({
                type: 'network',
                url: url,
                method: options.method || 'GET',
                status: 0,
                statusText: 'Network Error',
                responseTime: endTime - startTime,
                headers: options.headers || {},
                error: error.message
              }), '*');
              throw error;
            });
        };

        // Monitor XMLHttpRequest
        XMLHttpRequest.prototype.open = function(method, url, ...args) {
          this._method = method;
          this._url = url;
          this._startTime = Date.now();
          return originalXHROpen.apply(this, [method, url, ...args]);
        };

        XMLHttpRequest.prototype.send = function(...args) {
          const xhr = this;
          
          xhr.addEventListener('loadend', function() {
            const endTime = Date.now();
            const responseHeaders = {};
            
            try {
              xhr.getAllResponseHeaders().split('\\r\\n').forEach(line => {
                const parts = line.split(': ');
                if (parts.length === 2) {
                  responseHeaders[parts[0]] = parts[1];
                }
              });
            } catch (e) {
              // Ignore header parsing errors
            }
            
            window.parent.postMessage(JSON.stringify({
              type: 'network',
              url: xhr._url,
              method: xhr._method,
              status: xhr.status,
              statusText: xhr.statusText,
              responseTime: endTime - xhr._startTime,
              responseHeaders: responseHeaders,
              size: xhr.responseText ? new Blob([xhr.responseText]).size : 0,
              type: xhr.responseType || 'text'
            }), '*');
          });
          
          return originalXHRSend.apply(this, args);
        };
      })();
    `

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (iframeDoc) {
      const scriptElement = iframeDoc.createElement('script')
      scriptElement.textContent = script
      iframeDoc.head.appendChild(scriptElement)
    }
  }, [iframeRef, isRecording])

  const clearConsole = () => {
    setConsoleLogs([])
  }

  const clearNetwork = () => {
    setNetworkRequests([])
  }

  const executeCommand = () => {
    if (!commandInput.trim()) return

    const log: ConsoleLog = {
      id: `${Date.now()}-${Math.random()}`,
      level: 'log',
      message: `> ${commandInput}`,
      timestamp: new Date(),
      source: 'terminal',
    }

    setConsoleLogs((prev) => [...prev, log])
    setCommandInput('')
  }

  const copyLogs = () => {
    const logsText = consoleLogs
      .map(
        (log) =>
          `[${log.timestamp.toLocaleTimeString()}] ${log.level.toUpperCase()}: ${log.message}`,
      )
      .join('\n')
    navigator.clipboard.writeText(logsText)
  }

  const exportLogs = () => {
    const logsData = {
      console: consoleLogs,
      network: networkRequests,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(logsData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `terminal-logs-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredConsoleLogs = consoleLogs.filter((log) => {
    const matchesFilter =
      !filterText ||
      log.message.toLowerCase().includes(filterText.toLowerCase())
    const matchesLevel =
      selectedLogLevel === 'all' || log.level === selectedLogLevel
    return matchesFilter && matchesLevel
  })

  const filteredNetworkRequests = networkRequests.filter((request) => {
    return (
      !filterText ||
      request.url.toLowerCase().includes(filterText.toLowerCase())
    )
  })

  const getStatusColor = (status?: number) => {
    if (!status) return 'text-gray-500'
    if (status >= 200 && status < 300) return 'text-green-500'
    if (status >= 300 && status < 400) return 'text-yellow-500'
    if (status >= 400) return 'text-red-500'
    return 'text-gray-500'
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-500'
      case 'warn':
        return 'text-yellow-500'
      case 'info':
        return 'text-blue-500'
      default:
        return 'text-foreground'
    }
  }

  return (
    <div
      className={cn(
        'border-t border-purple-500/20 bg-black/80 backdrop-blur-sm font-mono text-sm',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 bg-black/50 p-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 px-2 text-white hover:bg-white/10"
          >
            <TerminalIcon className="h-4 w-4 mr-1" />
            Terminal
            <ChevronDownIcon
              className={cn(
                'h-4 w-4 ml-1 transition-transform duration-200',
                isOpen && 'rotate-180',
              )}
            />
          </Button>

          {isOpen && (
            <>
              <div className="h-4 w-px bg-border" />
              <Button
                variant={activeTab === 'console' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('console')}
                className="h-8 px-2 text-white hover:bg-white/10"
              >
                <TerminalIcon className="h-4 w-4 mr-1" />
                Console
              </Button>
              <Button
                variant={activeTab === 'network' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('network')}
                className="h-8 px-2 text-white hover:bg-white/10"
              >
                <NetworkIcon className="h-4 w-4 mr-1" />
                Network
              </Button>
            </>
          )}
        </div>

        {isOpen && (
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/10"
                  >
                    {isRecording ? (
                      <PauseIcon className="h-4 w-4" />
                    ) : (
                      <PlayIcon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isRecording ? 'Pause Recording' : 'Resume Recording'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={
                      activeTab === 'console' ? clearConsole : clearNetwork
                    }
                    className="h-8 w-8 p-0 text-white hover:bg-white/10"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear {activeTab === 'console' ? 'Console' : 'Network'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyLogs}
                    className="h-8 w-8 p-0 text-white hover:bg-white/10"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy Logs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={exportLogs}
                    className="h-8 w-8 p-0 text-white hover:bg-white/10"
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export Logs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="flex flex-col h-64">
          {/* Filters */}
          <div className="flex items-center gap-2 p-2 border-b border-purple-500/20 bg-black/30">
            <Input
              placeholder={`Filter ${activeTab}...`}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="h-8 text-xs bg-black/30 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400"
            />
            {activeTab === 'console' && (
              <select
                value={selectedLogLevel}
                onChange={(e) => setSelectedLogLevel(e.target.value)}
                className="h-8 px-2 text-xs border border-purple-500/30 rounded bg-black/30 text-white"
              >
                <option value="all">All Levels</option>
                <option value="log">Log</option>
                <option value="info">Info</option>
                <option value="warn">Warn</option>
                <option value="error">Error</option>
              </select>
            )}
          </div>

          {/* Console Tab */}
          {activeTab === 'console' && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredConsoleLogs.length === 0 ? (
                  <p className="text-muted-foreground text-xs">
                    No console output
                  </p>
                ) : (
                  filteredConsoleLogs.map((log) => (
                    <div
                      key={log.id}
                      className="text-xs flex items-start gap-2"
                    >
                      <span className="text-muted-foreground shrink-0">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 font-semibold',
                          getLogLevelColor(log.level),
                        )}
                      >
                        {log.level.toUpperCase()}
                      </span>
                      <span className="flex-1 break-words">{log.message}</span>
                    </div>
                  ))
                )}
                <div ref={consoleEndRef} />
              </div>

              {/* Command Input */}
              <div className="flex items-center gap-2 p-2 border-t border-purple-500/20 bg-black/30">
                <span className="text-white/60 text-xs"></span>
                <Input
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      executeCommand()
                    }
                  }}
                  placeholder="Enter command..."
                  className="h-8 text-xs flex-1 bg-black/30 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400"
                />
                <Button
                  size="sm"
                  onClick={executeCommand}
                  className="h-8 px-2 text-white hover:bg-white/10"
                >
                  <PlayIcon className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Network Tab */}
          {activeTab === 'network' && (
            <div className="flex-1 overflow-y-auto">
              {filteredNetworkRequests.length === 0 ? (
                <p className="text-muted-foreground text-xs p-2">
                  No network requests
                </p>
              ) : (
                <div className="space-y-1">
                  {filteredNetworkRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center gap-2 p-2 hover:bg-muted/30 border-b border-border/50"
                    >
                      <span className="text-muted-foreground text-xs shrink-0">
                        {request.timestamp.toLocaleTimeString()}
                      </span>
                      <span
                        className={cn(
                          'text-xs font-semibold shrink-0 w-12',
                          getStatusColor(request.status),
                        )}
                      >
                        {request.status || 'Pending'}
                      </span>
                      <span className="text-xs font-mono shrink-0 w-16">
                        {request.method}
                      </span>
                      <span className="text-xs flex-1 truncate">
                        {request.url}
                      </span>
                      {request.responseTime && (
                        <span className="text-muted-foreground text-xs shrink-0">
                          {request.responseTime}ms
                        </span>
                      )}
                      {request.size && (
                        <span className="text-muted-foreground text-xs shrink-0">
                          {request.size > 1024
                            ? `${(request.size / 1024).toFixed(1)}KB`
                            : `${request.size}B`}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div ref={networkEndRef} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
