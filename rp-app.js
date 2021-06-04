class RPApp extends HTMLElement {
    #containerHtml;
    #headerHtml;
    #bannerHtml;
    #contentHtml;
    #cardHtml;
    #footerHtml;

    constructor(){
        super()
    }

    connectedCallback(){
    this.#render()
    }

    #render(){

        let me = this
        let shadow = this.attachShadow({mode:'open'})
        createStyle()
        createContainer()
        createHeader()
        createBanner()
        createContent()
        createCard()
        createFooter()


        //---

        function createStyle(){
            let styleHtml = document.createElement('link')
            styleHtml.setAttribute('href', 'rp-app.css')
            styleHtml.setAttribute('rel', 'stylesheet')
            shadow.append(styleHtml)
        }

        function createContainer(){
            me.#containerHtml = document.createElement('div')
            me.#containerHtml.classList.add('App')
            shadow.append(me.#containerHtml)
        }

        function createHeader(){
            me.#headerHtml = document.createElement('slot')
            me.#headerHtml.setAttribute('name', 'header')
            me.#headerHtml.classList.add('App__header')
            me.#containerHtml.append(me.#headerHtml)
        }

        function createContent(){
            me.#contentHtml = document.createElement('slot')
            me.#contentHtml.setAttribute('name', 'App__content')
            me.#contentHtml.classList.add('App__content')
            me.#containerHtml.append(me.#contentHtml)
        }

        function createCard(){
            me.#cardHtml = document.createElement('slot')
            me.#cardHtml.setAttribute('name', 'card')
            me.#cardHtml.classList.add('App__content_card')
            me.#contentHtml.append(me.#cardHtml)
        }

        function createFooter(){
            me.#footerHtml = document.createElement('slot')
            me.#footerHtml.setAttribute('name', 'footer')
            me.#footerHtml.classList.add('App__footer')
            me.#containerHtml.append(me.#footerHtml)
        }

        function createBanner(){
            me.#bannerHtml = document.createElement('slot')
            me.#bannerHtml.setAttribute('name', 'banner')
            me.#bannerHtml.classList.add('App__banner')
            me.#containerHtml.append(me.#bannerHtml)
        }
    }
}



window.customElements.define('rp-app', RPApp)

export default {

}