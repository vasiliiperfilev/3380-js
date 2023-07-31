export function handleInput(e, setState) {
  const { id, value } = e.target;
    setState(prev => {
      return {
        ...prev,
        [id]: value
      }
    })
}