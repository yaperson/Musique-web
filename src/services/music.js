
export default class {
    static async musicList (){
        var params = { method: 'GET',
                    //    mode: 'no-cors',
                       headers: {
                        "Accept": "application/json"
                      }
                    };
        let response = await fetch('http://localhost:3900/music/musicRepertory', params)
        // console.log(response.json())
        let data = await response
        data = response.json()
        return data
    }
}