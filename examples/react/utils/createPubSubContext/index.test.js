import React, { useContext, useState, useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import createPubSubContext from '.'

describe('createPubSubContext', () => {
  it("should not trigger a subscribe handler if publish didn't happen", async () => {
    const handleSubscribe = jest.fn()
    const { PubSubProvider, PubSubContext } = createPubSubContext()

    const Component = () => {
      const { subscribe } = useContext(PubSubContext)

      useEffect(() => {
        const unsubscribe = subscribe('event', handleSubscribe)

        return unsubscribe
      }, [subscribe])

      return null
    }

    render(
      <PubSubProvider>
        <Component />
      </PubSubProvider>
    )

    expect(handleSubscribe).toHaveBeenCalledTimes(0)
  })

  it('should trigger a subscribe handler on publish', async () => {
    const { PubSubProvider, PubSubContext } = createPubSubContext()
    const handleSubscribe = jest.fn()

    const Component = () => {
      const { publish, subscribe } = useContext(PubSubContext)
      const eventName = 'event'

      useEffect(() => {
        const unsubscribe = subscribe(eventName, handleSubscribe)

        return unsubscribe
      }, [subscribe])

      return <button onClick={() => publish(eventName)}>Increment</button>
    }

    render(
      <PubSubProvider>
        <Component />
      </PubSubProvider>
    )

    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(handleSubscribe).toHaveBeenCalledTimes(1)
  })

  it('should trigger a subscribe handler on publish multiple times', async () => {
    const { PubSubProvider, PubSubContext } = createPubSubContext()
    const handleSubscribe = jest.fn()

    const Component = () => {
      const { publish, subscribe } = useContext(PubSubContext)
      const eventName = 'event'

      useEffect(() => {
        const unsubscribe = subscribe(eventName, handleSubscribe)

        return unsubscribe
      }, [subscribe])

      return <button onClick={() => publish(eventName)}>Increment</button>
    }

    render(
      <PubSubProvider>
        <Component />
      </PubSubProvider>
    )

    const button = screen.getByRole('button')

    await userEvent.click(button)
    await userEvent.click(button)
    await userEvent.click(button)

    expect(handleSubscribe).toHaveBeenCalledTimes(3)
  })

  it('should pass data from publish to subscribe handler', async () => {
    const { PubSubProvider, PubSubContext } = createPubSubContext()
    const handleSubscribe = jest.fn()
    const data = { foo: 'bar' }

    const Component = () => {
      const { publish, subscribe } = useContext(PubSubContext)
      const eventName = 'event'

      useEffect(() => {
        const unsubscribe = subscribe(eventName, handleSubscribe)

        return unsubscribe
      }, [subscribe])

      return <button onClick={() => publish(eventName, data)}>Increment</button>
    }

    render(
      <PubSubProvider>
        <Component />
      </PubSubProvider>
    )

    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(handleSubscribe).toHaveBeenCalledWith(data)
  })

  it('should allow to communicate between components', async () => {
    const { PubSubProvider, PubSubContext } = createPubSubContext()
    const eventName = 'increment'

    const Component1 = () => {
      const { publish } = useContext(PubSubContext)

      return <button onClick={() => publish(eventName)}>Increment</button>
    }

    const Component2 = () => {
      const { subscribe } = useContext(PubSubContext)
      const [count, setCount] = useState(0)

      useEffect(() => {
        const unsubscribe = subscribe(eventName, () => setCount((prevCount) => prevCount + 1))

        return unsubscribe
      }, [subscribe])

      return <div>Count: {count}</div>
    }

    render(
      <PubSubProvider>
        <Component1 />
        <Component2 />
      </PubSubProvider>
    )

    const button = screen.getByRole('button')
    const count = screen.getByText('Count:', { exact: false })

    await userEvent.click(button)

    expect(count).toHaveTextContent('Count: 1')
  })

  it('should work with multiple publishers', async () => {
    const { PubSubProvider, PubSubContext } = createPubSubContext<{ increment: number }>()
    const eventName = 'increment'

    const Component1 = () => {
      const { publish } = useContext(PubSubContext)

      return <button onClick={() => publish(eventName, 1)}>Increment by one</button>
    }

    const Component2 = () => {
      const { publish } = useContext(PubSubContext)

      return <button onClick={() => publish(eventName, 5)}>Increment by five</button>
    }

    const Component3 = () => {
      const { subscribe } = useContext(PubSubContext)
      const [count, setCount] = useState(0)

      useEffect(() => {
        const unsubscribe = subscribe(eventName, (data) => setCount((prevCount) => prevCount + Number(data)))

        return unsubscribe
      }, [subscribe])

      return <div>Count: {count}</div>
    }

    render(
      <PubSubProvider>
        <Component1 />
        <Component2 />
        <Component3 />
      </PubSubProvider>
    )

    const button1 = screen.getByText('Increment by one')
    const button2 = screen.getByText('Increment by five')
    const count = screen.getByText('Count:', { exact: false })

    await userEvent.click(button1)
    await userEvent.click(button2)

    expect(count).toHaveTextContent('Count: 6')
  })

  it('should work multiple subscribers', async () => {
    const { PubSubProvider, PubSubContext } = createPubSubContext()
    const eventName = 'increment'

    const Component1 = () => {
      const { publish } = useContext(PubSubContext)

      return <button onClick={() => publish(eventName)}>Increment</button>
    }

    const Component2 = () => {
      const { subscribe } = useContext(PubSubContext)
      const [count, setCount] = useState(0)

      useEffect(() => {
        const unsubscribe = subscribe(eventName, () => setCount((prevCount) => prevCount + 1))

        return unsubscribe
      }, [subscribe])

      return <div>Count: {count}</div>
    }

    const Component3 = () => {
      const { subscribe } = useContext(PubSubContext)
      const [count, setCount] = useState(0)

      useEffect(() => {
        const unsubscribe = subscribe(eventName, () => setCount((prevCount) => prevCount + 2))

        return unsubscribe
      }, [subscribe])

      return <div>Double count: {count}</div>
    }

    render(
      <PubSubProvider>
        <Component1 />
        <Component2 />
        <Component3 />
      </PubSubProvider>
    )

    const button = screen.getByRole('button')
    const [count, doubleCount] = screen.getAllByText('count:', { exact: false })

    await userEvent.click(button)

    expect(count).toHaveTextContent('Count: 1')
    expect(doubleCount).toHaveTextContent('Double count: 2')
  })

  it('should work with multiple events', async () => {
    const { PubSubProvider, PubSubContext } = createPubSubContext()

    const Component1 = () => {
      const { publish } = useContext(PubSubContext)

      return (
        <>
          <button onClick={() => publish('increment')}>Increment</button>
          <button onClick={() => publish('decrement')}>Decrement</button>
        </>
      )
    }

    const Component2 = () => {
      const { subscribe } = useContext(PubSubContext)
      const [count, setCount] = useState(0)

      useEffect(() => {
        const unsubscribe = subscribe('increment', () => setCount((prevCount) => prevCount + 1))

        return unsubscribe
      }, [subscribe])

      useEffect(() => {
        const unsubscribe = subscribe('decrement', () => setCount((prevCount) => prevCount - 1))

        return unsubscribe
      }, [subscribe])

      return <div>Count: {count}</div>
    }

    render(
      <PubSubProvider>
        <Component1 />
        <Component2 />
      </PubSubProvider>
    )

    const incrementButton = screen.getByText('Increment')
    const decrementButton = screen.getByText('Decrement')
    const count = screen.getByText('Count:', { exact: false })

    await userEvent.click(incrementButton)
    await userEvent.click(incrementButton)
    await userEvent.click(decrementButton)

    expect(count).toHaveTextContent('Count: 1')
  })

  it('should work with multiple contexts', async () => {
    const { PubSubProvider: PubSubProvider1, PubSubContext: PubSubContext1 } = createPubSubContext()
    const { PubSubProvider: PubSubProvider2, PubSubContext: PubSubContext2 } = createPubSubContext()

    const Component1 = () => {
      const { publish } = useContext(PubSubContext1)

      return <button onClick={() => publish('increment')}>Outer increment</button>
    }

    const Component2 = () => {
      const { subscribe } = useContext(PubSubContext1)
      const [count, setCount] = useState(0)

      useEffect(() => {
        const unsubscribe = subscribe('increment', () => setCount((prevCount) => prevCount + 1))

        return unsubscribe
      }, [subscribe])

      return <div>Outer count: {count}</div>
    }

    const Component3 = () => {
      const { publish } = useContext(PubSubContext2)

      return <button onClick={() => publish('increment')}>Inner increment</button>
    }

    const Component4 = () => {
      const { subscribe } = useContext(PubSubContext2)
      const [count, setCount] = useState(0)

      useEffect(() => {
        const unsubscribe = subscribe('increment', () => setCount((prevCount) => prevCount + 1))

        return unsubscribe
      }, [subscribe])

      return <div>Inner count: {count}</div>
    }

    render(
      <PubSubProvider1>
        <Component1 />
        <Component2 />
        <PubSubProvider2>
          <Component3 />
          <Component4 />
        </PubSubProvider2>
      </PubSubProvider1>
    )

    const outerIncrementButton = screen.getByText('Outer increment')
    const innerIncrementButton = screen.getByText('Inner increment')
    const outerCount = screen.getByText('Outer count:', { exact: false })
    const innerCount = screen.getByText('Inner count:', { exact: false })

    await userEvent.click(outerIncrementButton)
    await userEvent.click(innerIncrementButton)

    expect(outerCount).toHaveTextContent('Outer count: 1')
    expect(innerCount).toHaveTextContent('Inner count: 1')
  })
})
