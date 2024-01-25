import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'

import App from './App'
import { BlogsContextProvider } from './blogsContext'
import { LoggedInContextProvider } from './loggedInContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BlogsContextProvider>
      <NotificationContextProvider>
        <LoggedInContextProvider>
          <App />
        </LoggedInContextProvider>
      </NotificationContextProvider>
    </BlogsContextProvider>
  </QueryClientProvider>
)
