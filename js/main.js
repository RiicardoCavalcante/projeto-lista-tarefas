
const Main = {

    task: [],

    init: function() {
        this.cacheSelectors()
        this.bindEvents()
        this.getStorage()
        this.buildTasks()
    },

    cacheSelectors: function(){
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function() {
        const self = this
        
        this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click
        })
    },

    getStorage: function() {
        const task = localStorage.getItem('task')

        this.task = JSON.parse(task)
    },

    buildTasks: function(){
        let html = ''
        this.task.forEach(item => {
            html += `
            <li>
                <div class="check"></div>
                <label class="task">
                   ${item.task}
                </label>
                <button class="remove"></button>
            </li>
        `
        })

        this.$list.innerHTML = html
    },


    Events: {
        checkButton_click: function(e){
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if(isDone){
                li.classList.remove('done')
            }else {
                li.classList.add('done')
            }
           
        },

        inputTask_keypress: function(e){
            const key = e.key
            const value = e.target.value

            if(key === 'Enter') {
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                           ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `
                e.target.value = ''

                this.cacheSelectors()
                this.bindEvents()

                const savedTasks = localStorage.getItem('task')
                const savedTasksObj = JSON.parse('savedTask')

                const obj = [
                    { task: value }, 
                    ...savedTasksObj ,
                ]

                localStorage.setItem('task', JSON.stringify(obj))
            }
        },

        removeButton_click: function(e){
            let li = e.target.parentElement
            
            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }
    }

}

Main.init()