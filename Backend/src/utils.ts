export function Random(len : number){

    let options = "abcdefghijklmnopqrstuvwxyzfcwsfgxcw123456789"
    let length = options.length
    let ans = ""

    for (let i=0;i<len;i++)
    {
        ans += options[Math.floor(Math.random() * length)];
    }

    return ans;
}