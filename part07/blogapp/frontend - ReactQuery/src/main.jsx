import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { BlogsContextProvider } from './blogsContext'
import { LoggedInContextProvider } from './loggedInContext'
import { UsersContextProvider } from './usersContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BlogsContextProvider>
      <NotificationContextProvider>
        <LoggedInContextProvider>
          <UsersContextProvider>
            <Router>
              <App />
            </Router>
          </UsersContextProvider>
        </LoggedInContextProvider>
      </NotificationContextProvider>
    </BlogsContextProvider>
  </QueryClientProvider>
)
