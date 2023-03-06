
Executes a callback immediately after a component is mounted.

- Use the `useEffect()` hook with an empty array as the second argument. This will execute the provided callback only once when the component is mounted.
- Behaves like the `componentDidMount()` lifecycle method of class components.

```jsx
const useComponentDidMount = onMountHandler => {
  React.useEffect(() => {
    onMountHandler();
  }, []);
};
```

```jsx
const Mounter = () => {
  useComponentDidMount(() => console.log('Component did mount'));

  return <div>Check the console!</div>;
};

ReactDOM.render(<Mounter />, document.getElementById('root'));
```
