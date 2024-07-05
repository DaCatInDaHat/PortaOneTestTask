
let maxDiv = document.querySelector('#max')
let minDiv = document.querySelector('#min')
let medianDiv = document.querySelector('#median')
let averageDiv = document.querySelector('#average')
let increaseDiv = document.querySelector('#increase')
let decreaseDiv = document.querySelector('#decrease')

document.getElementById('file').onchange = function() {
    const file = this.files[0]  
    const reader = new FileReader()

    reader.onload = (event) => {
        let data = []     
        const text = event.target.result
        let lines = text.trim().split('\n')
        
        lines.forEach(line => {        
            data.push(parseInt(line));
        })

        let maxVal = data.reduce((prev, current) => {
            return prev > current ? prev : current
        })
        
        document.querySelector('#max').innerText = `Maximum Value Is: ${maxVal}`

        let minVal = data.reduce((prev, current) => {
            return prev < current ? prev : current
        })

        minDiv.innerText = `Minimum Value Is: ${minVal}`

        function findMedianValue(arr) {
            arr.sort((a, b) => a - b)
            const middleIndex = Math.floor(arr.length / 2)
            return arr.length % 2 === 0 ? (arr[middleIndex - 1] + arr[middleIndex]) / 2 : arr[middleIndex]
        }

        medianDiv.innerText = `The Median Value Is: ${findMedianValue(data)}`

        function findAverageValue(arr) {
            let sum = arr.reduce((prev, current) => {
                return prev + current
            })
            
            return sum/(arr.length-1)
        }

        averageDiv.innerText = `The Average Value Is: ${findAverageValue(data)}`

        function makeIncreaseOrderList(arr) {
            let temp = arr.sort((x, y) => x - y).slice(0,5)
            let title = document.createElement('p')
            title.innerText = 'Increase Order List'
            increaseDiv.append(title)                        
            
            temp.forEach( element => {
                let para = document.createElement('p')
                para.innerText = element
                increaseDiv.append(para)
            })
        }

        makeIncreaseOrderList(data)
        
        function makeDecreaseOrderList(arr) {
            let temp = arr.sort((x, y) => y - x).slice(0,5)
            let title = document.createElement('p')
            title.innerText = 'Decrease Order List'
            decreaseDiv.append(title)
            
            temp.forEach( element => {
                let para = document.createElement('p')
                para.innerText = element
                decreaseDiv.append(para)
            })
        }

        makeDecreaseOrderList(data)        
    }

    reader.readAsText(file)
}
