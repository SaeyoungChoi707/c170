AFRAME.registerComponent("marker-handler",{
    init: async function(){
        this.el.addEventListener("markerFound",()=>{
            console.log("marker is found")
        })
        this.el.addEventListener("markerLost",()=>{
            console.log("marker lost")
        })
    },
    handleMarkerFound: function(){
      var buttonDiv = document.getElementById("button-div")
      buttonDiv.style.display = "flex"  
      var summaryBtn = document.getElementById("order-summary-button")
      var orderBtn = document.getElementById("order-button")
      
      summaryBtn.addEventListener("click",function(){
          swal({
              icon:"warning",
              title:"order summary",
              text:"work in progress",

          })
      })  

      orderBtn.addEventListener("click",()=>{
        swal({
            icon:"https://i.imgur.com/4NZ6uLY.jpg",
            title:"thanks for the order",
            text:"your order will be delivered soon",
            
        })
    })  
    },

    handleMarkerLost: function(){
      var buttonDiv = document.getElementById("button-div")
      buttonDiv.style.display = "none"  
    },
})