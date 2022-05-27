export function stringSum (charString:string){
    let sum = 0
    for (const c of Array(charString.length).keys()){
        // console.log(id.charCodeAt(c))
        sum = sum + charString.charCodeAt(c)
    }
    return sum
}