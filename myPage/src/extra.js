
const INITIAL_INDEX = 0;


React.useEffect(() => {
    const interval = setInterval(() => {
        if (index === image.length - 1) {
            setIndex(INITIAL_INDEX)
        } else {
            setIndex(index + 1)
        }
    }, 3000)
    return () => clearInterval(interval)

}, [index])