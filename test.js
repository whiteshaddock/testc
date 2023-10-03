
window.onload = function () {

    // 获取滑动条所在链接全部元素
    const slideAll = document.querySelectorAll('.nav-right li')
    // 获取滑动条
    const move = document.getElementById('move')

    // 获取图片容器
    const imageWrap = document.getElementById('image')

    // 获取箭头
    const arrowRight = document.getElementById('arrow-right')
    const arrowLeft = document.getElementById('arrow-left')

    // 获取轮播图圆点容器
    const dropWrap = document.getElementById('drop')

    // 获取图表元素
    const grap1 = document.getElementById('top-charts')
    const grap2 = document.getElementById('bottom-left-charts')
    const grap3 = document.getElementById('bottom-right-charts')

    // 存储当前滑动条的位置
    let moveWidth = move.style.left
    //滑动条随鼠标移动
    slideAll.forEach((element, index) => {
        element.addEventListener('mouseenter', function () {
            move.style.left = element.offsetWidth * index + 'px'
        })
        element.addEventListener('mouseleave', function () {
            // 离开时恢复原先存储的滑动条位置
            move.style.left = moveWidth
        })
        element.addEventListener('click', function () {
            // 滑动的同时修改存储滑动条的位置
            move.style.left = moveWidth = element.offsetWidth * index + 'px'
        })
    })

    // 动态生成轮播图图片
    function addImg() {
        
        // 占位图
        // const srcArr = ['540x260', '540x260', '540x260', '540x260', '540x260']
        // 轮播图图片部分地址
        const srcArr = ['x', '2', '3', '4', '5']

        srcArr.forEach((element,index) => {
            let addLi = document.createElement('li')
            let addA = document.createElement('a')
            let addImg = document.createElement('img')
            // 设置属性
            addA.href = "javascript:;"
            // addImg.src = `http://placehold.it/${element}/${index}${index}${index}`
            addImg.src = `asset/img/${element}.jpeg`
            // 插入
            imageWrap.appendChild(addLi)
            addLi.appendChild(addA)
            addA.appendChild(addImg)
        })
    }
    addImg()


    // 动态创建小圆点
    function addDrop() {
        // 将HTMLCollection类数组对象变成真数组
        imgNum = Array.from(imageWrap.children)
        imgNum.forEach(element => {
            let dropNode = document.createElement('div')
            dropWrap.appendChild(dropNode)
        })
        // 第一个子节点添加active类
        dropWrap.firstElementChild.classList.add("active")
    }
    addDrop()

    // 图片下标
    let index = 0

    // 存储所有小圆点、图片的节点数组
    const dropAll = Array.from(dropWrap.children)
    const imageAll = Array.from(imageWrap.children)

    // 轮播图循环播放
    function loop() {
        if (index < imageWrap.children.length && index >= 0) {

            imageWrap.style.left = -imageAll[0].offsetWidth * index + 'px'

            // 调用小圆点active状态
            dropActiveFunc(index)

            // 准备进行下张图片播放
            index++
        }
        else {
            // 其它情况，跳转到第一张
            imageWrap.style.left = 0 + 'px'

            // 存储当前图片索引
            index = Math.abs(parseInt(imageWrap.style.left) / imageAll[0].offsetWidth)

            // 调用小圆点active状态
            dropActiveFunc(index)

            // 准备进行下张图片播放
            index++
        }
    }

    // 左箭头
    function loopRev() {

        // 由于上次index+1，所有-1才是当前图片下标
        if (index >= 0) index--

        // 图片至少为第1张，才能进行上一个图片移动
        if (index > 0) {

            // 图片向右移动，即播放上一张
            imageWrap.style.left = parseInt(imageWrap.style.left) + imageAll[0].offsetWidth + 'px'

            // 存储当前播放图片下标
            index = Math.abs(parseInt(imageWrap.style.left) / imageAll[0].offsetWidth)

            // 调用小圆点active状态
            dropActiveFunc(index)

            // 进行下一张播放
            index++
        }
        else {
            // 其它情况，跳转到最后一张
            imageWrap.style.left = -imageAll[0].offsetWidth * (imageAll.length - 1) + 'px'

            // 调用小圆点active状态，小圆点跳转至最后一个图片位置（修改）
            dropActiveFunc(imageAll.length - 1)

            // 进行下一张播放 
            index = Math.abs(parseInt(imageWrap.style.left) / imageAll[0].offsetWidth) + 1
        }
    }

    // 轮播图播放定时器函数
    function loopauto() {
        timer = setInterval(loop, 1500)
    }

    // 首次先自行调用
    loop()
    // 继续自动播放
    loopauto()


    // 点击右箭头
    arrowRight.addEventListener('click', function () {

        clearInterval(timer)
        // 立即执行一次轮播图播放
        loop()
        // 继续自动播放
        loopauto()
    })

    // 点击左箭头
    arrowLeft.addEventListener('click', function () {

        // 清除定时器
        clearInterval(timer)

        // 立即执行一次轮播图播放
        loopRev()

        // 继续自动播放
        loopauto()
    })

    // 点击小圆点立刻播放图片
    function dropClick(indexflag) {
        imageWrap.style.left = -imageAll[0].offsetWidth * indexflag + 'px'
        // 为下次播放做准备
        index++
    }

    // 轮播图 小圆点 点击监听事件
    dropAll.forEach((element, index) => {
        element.addEventListener('click', function () {
            // 清除定时器
            clearInterval(timer)

            dropClick(index)

            // 调用小圆点active状态
            dropActiveFunc(index)

            // 继续自动播放
            loopauto()
        })
    })

    // 小圆点active状态
    function dropActiveFunc(indexflag) {

        dropAll.forEach(item => {
            if (item.classList.contains("active"))
                item.classList.remove("active")
        })

        dropAll[indexflag].classList.add("active")
    }

    // 鼠标放上停止滑动
    function stopPic() {

        // 保存当前播放图片下标
        let index = Math.abs(parseInt(imageWrap.style.left) / imageAll[0].offsetWidth)

        // 清除定时器
        clearInterval(timer)

        // 为下次做准备
        index++
    }

    // 鼠标离开继续滑动
    function continuePic() {
        // 开启计时器
        timer = setInterval(loop, 1500)
    }

    imageWrap.addEventListener('mouseenter', stopPic)
    imageWrap.addEventListener('mouseleave', continuePic)

    // 请求
    function getData(typeParams) {
        return axios({
            url: 'https://edu.telking.com/api/',
            methods: 'GET',
            params: {
                type: typeParams
            }
        })
    }

    getData('month').then(res => {
        // 用于存储返回的数据
        let seriesArrOne = []
        let xAxisArrOne = []
        if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.series.length; i += 2) {
                seriesArrOne.push(res.data.data.series[i])
                xAxisArrOne.push(res.data.data.xAxis[i])
            }
        }

        // 第一个 折线图
        let mycharts1 = echarts.init(grap1)
        mycharts1.setOption({
            title: {
                text: '曲线图数据展示',
                // 标题居中显示
                left: 'center',
                top: 20
            },
            // 调整图形位置
            grid: [{
                top: '20%',
                bottom: '12%',
                left: '10%',
                right: '6%'
            }],

            // x轴
            xAxis: {
                data: xAxisArrOne,
                axisTick: {
                    show: false // 不显示坐标轴刻度线
                },
                axisLine: {
                    show: false, // 不显示坐标轴线
                },
            },
            // y轴
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        // 设置背景的网格线为虚线
                        type: 'dashed'
                    }
                },
            },

            // 配置
            series: [
                {
                    // 曲线光滑
                    smooth: true,
                    itemStyle: {
                        normal: {
                            // 数值
                            label: { show: true }
                        }
                    },
                    type: "line",
                    // 数据
                    data: seriesArrOne,
                    // 线颜色
                    color: '#5D8EB8',
                    areaStyle: {
                        color: '#7EBFF7',

                    },
                }
            ]
        })
    })

    getData('week').then(res => {
        // 存储数据初始化
        let seriesArrTwo = []
        let xAxisArrTwo = []
        let Twodata = []
        let TwodataObj = {}

        if (res.data.code === 200) {
            let arr = []
            // 解构
            const { series } = res.data.data
            const { xAxis } = res.data.data
            seriesArrTwo = arr.concat(series)
            xAxisArrTwo = arr.concat(xAxis)
        }

        for (let i = 0; i < xAxisArrTwo.length; i++) {
            TwodataObj = {
                value: seriesArrTwo[i],
                name: `${xAxisArrTwo[i]}`
            }
            Twodata.push(TwodataObj)
        }

        // 第二个 饼图
        let mycharts2 = echarts.init(grap2)
        mycharts2.setOption({
            title: {
                text: '饼状图数据展示',
                // 调整标题位置
                left: 'center',
                top: 20
            },
            series: [
                {
                    type: 'pie',
                    data: Twodata,
                    // 调整图形位置
                    center: ['50%', '55%']
                }
            ]
        })

        // 第三个 柱状图
        let mycharts3 = echarts.init(grap3)
        mycharts3.setOption({
            title: {
                text: '柱状图数据展示',
                // 调整标题位置
                left: 'center',
                top: 20
            },
            // 调整图形位置
            grid: [{
                left: '15%',
                bottom: '20%',
                top: '20%',
                right: '15%'
            }],
            xAxis: {
                data: xAxisArrTwo,
                axisTick: {
                    show: false // 不显示坐标轴刻度线
                },
                axisLine: {
                    show: false, // 不显示坐标轴线
                },
            },
            yAxis: {
                name: '商品数',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        // 设置背景的网格线为虚线
                        type: 'dashed'
                    }
                }
            },
            series: [{
                type: 'bar',
                data: seriesArrTwo,
                color: '#7EBFF7'
            }]
        })
    })
}

