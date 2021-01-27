const {createElement, useState, useEffect} = React
const length = 10000 // 1000


function Button () {
  const [count, setCount] = useState(0)

  // useEffect(() => setTimeout(() => setCount(1)), [])

  return createElement('button', {
    onClick () {
      setCount(count + 1)
    }
  }, count)
}

ReactDOM.render(
  [...new Array(length)].map(
    () => createElement(Button)
  ),
  document.getElementById('app')
)
