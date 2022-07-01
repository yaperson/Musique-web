
export default class {
    static async musicList (){
        var params = { method: 'GET',
                       mode: 'no-cors'};
        let response = await fetch('http://localhost:3900/music/musicRepertory', params)
        console.log(response)
        let data = await response.json()
        return data
    }
}