const {onMounted} = innet
const {State} = watchState
const length = 10000 // 1000

function Button () {
  const count = new State(0)

  // onMounted(() => setTimeout(() => {
  //   count.value = 1
  // }))

  // or

  // setTimeout(() => {
  //   count.value = 1
  // })

  return {
    type: 'button',
    props: {
      onclick () {
        count.value++
      }
    },
    children: [
      () => count.value
    ]
  }
}

innet([...new Array(length)].map(() => ({
  type: Button
})), document.getElementById('app'))
