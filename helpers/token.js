

const generarId = () => Math.random().toString(32).substring() + Date.now().toString(32)

export {
    generarId
}