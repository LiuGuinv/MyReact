setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 

1000));
    var expires = "expires=" + d.toUTCString();
//	    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + 

expires;
//	    console.info(document.cookie);
}

componentDidMount(){
//		//设置cookie
    let str = 'province=2; city=52; district=500; area_region=9; ECS[display]=grid; ECS[history_goods]=125911%2C122122%2C125091%2C123387%2C121716; province=2; city=52; 

district=500; 

session_id_ip=61.144.97.251_8ebdb9d7a79cf97ac6b60fbb0a500dea; 

UM_distinctid=1675f491cd78d-072a89f17bf093-424e0b28-15f900-

1675f491cd8ad; CNZZDATA1257355159=508007698-1543491539-http%253A

%252F%252Fwww.so.com%252F%7C1543539082; 

ECSCP_ID=4018626fb1cc55049989bb15abafc962055ab45a; ECS

[visit_times]=10';

    var arr=str.split('; ');
          var arr2=[];
        for (var i=0;i<arr.length;i++) {
            arr2=arr[i].split('=');
            this.setCookie(arr2[0],arr2[1],7);
        }
        //当前时间戳
          let time=new Date().getTime();	
          axios.post(`/syapi/mobile/index.php?r=site/Index/async_list&ts=0.3005873097339631`,
            qs.stringify({
                page: 1,
                size: 10
            }),
            {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                }			
            })
              .then(res=>{
                  let data= res.data.list;
                  this.setState({
                      list:data
                  })
              })
              .catch((err)=>{
                  console.log(err);
              })
}
