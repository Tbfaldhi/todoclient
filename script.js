const app = new Vue({
    el: "#app",
     data:{
       apidata:'',
       searchdata:{
         status:''
       },
      taskdata:{
        task:''
      },
      tasklist:[]
    },
    methods: {

      logout:function(){

          localStorage.removeItem('token')
          window.location.href = './index.html'

       },
      update:function (task) {  

          axios.put('https://whispering-shore-29272.herokuapp.com/updatetask',{task} )
          .then(res=>{
            swal({
              title: "status change",
              text: "success change status",
              icon: "warning",
            });

           this.fetchdata()           
          })
          .catch(err=>{
            console.log(err);
            
          }) 

      },
      deleted: function (data) {  

        axios.delete(`https://whispering-shore-29272.herokuapp.com/deletetask/${data}`)
        .then(data=>{
          swal({
            title: "Success deleted",
            
            icon: "warning",
          });
          
          this.fetchdata()
        })
        .catch(err=>{
          console.log(err);
          
        })
      },

      fetchdata(){

        token = localStorage.getItem('token')
        let self = this   
        axios.get("https://whispering-shore-29272.herokuapp.com/getlist",{headers: {token: token}})
        .then(function (data) {
          self.tasklist = data.data
        })
        .catch(err=>{
          console.log(err);          
        }) 
      },
      addtask(){
        token = localStorage.getItem('token')    
        axios.post('https://whispering-shore-29272.herokuapp.com/addTask',{task:this.taskdata.task},{headers: {token: token}})
        .then(data=>{
          swal({
            title: "Success add",   
            icon: "success",
          });
          this.fetchdata()
        })
        .catch(err=>{
          console.log(err);
          
        })
       
      },
      getapi(){

        let self = this
        axios.get("https://api.chucknorris.io/jokes/random")
        .then(sentences=>{
            console.log('======',sentences.data.value);
            this.apidata=sentences.data.value
            //word=sentences
        })
        .catch(err=>{
          console.log(err);
          
        })
      }
    },
    created:function () {
      this.fetchdata()
      this.getapi()
    }  
  })

