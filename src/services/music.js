
export default class {
    static async musicList (){
        var params = { method: 'GET',
                    //    mode: 'no-cors',
                       headers: {
                        "Accept": "application/json"
                      }
                    };
        // let response = await fetch('http://localhost:3900/music/musicRepertory', params) // LOCAL
        let response = await fetch('https://yaperson.alwaysdata.net/music/musicRepertory', params) // SERVER
        // console.log(response.json())
        let data = await response
        data = response.json()
        return data
    }
}