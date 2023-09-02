import React, { createContext, FC, useRef, useCallback } from 'react'
import { uniqueId } from 'lodash'

// `data` is always optional both for `publish` and `subscribe`
// even if it's not optional in the type provided to `createPubSubContext`.
// Unfortunately, all attempts to make it work were too complicated and didn't work well.
type Context<T> = {
  publish<EventName extends keyof T>(eventName: EventName, data?: T[EventName]): void
  subscribe<EventName extends keyof T>(eventName: EventName, onEvent: (data?: T[EventName]) => void): void
}

type CreatePubSubContextReturn<T> = {
  PubSubContext: React.Context<Context<T>>
  PubSubProvider: FC
}

type EventHandlers<T> = {
  [K in keyof T]: {
    [id: string]: (data?: T[K]) => void
  }
}

const createPubSubContext = <T extends Record<string, unknown>>(): CreatePubSubContextReturn<T> => {
  const defaultValues: Context<T> = {
    publish: () => undefined,
    subscribe: () => undefined,
  }

  const PubSubContext = createContext<Context<T>>(defaultValues)

  const PubSubProvider: FC = ({ children }) => {
    const eventHandlers = useRef<EventHandlers<T>>({} as EventHandlers<T>)

    const publish = useCallback<Context<T>['publish']>((eventName, data) => {
      if (!eventHandlers.current[eventName]) {
        return
      }

      Object.values(eventHandlers.current[eventName]).forEach((onEvent) => {
        onEvent(data)
      })
    }, [])

    const subscribe = useCallback<Context<T>['subscribe']>((eventName, onEvent) => {
      const id: keyof EventHandlers<T>[typeof eventName] = uniqueId()

      if (!eventHandlers.current[eventName]) {
        eventHandlers.current[eventName] = {} as EventHandlers<T>[typeof eventName]
      }

      eventHandlers.current[eventName][id] = onEvent as EventHandlers<T>[typeof eventName][typeof id]

      return () => {
        delete eventHandlers.current[eventName][id]
      }
    }, [])

    return (
      <PubSubContext.Provider
        value={{
          publish,
          subscribe,
        }}
      >
        {children}
      </PubSubContext.Provider>
    )
  }

  return {
    PubSubContext,
    PubSubProvider,
  }
}

export default createPubSubContext
