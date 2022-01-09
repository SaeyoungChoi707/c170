AFRAME.registerComponent("create-markers", {
    init: async function(){
      var mainscene = document.querySelector("#main-scene")
      var toys = await this.getAllToys()
  
      toys.map(toy=>{
        var marker = document.createElement("a-marker")
        marker.setAttribute("id",toy.id)
        marker.setAttribute("type","pattern")
        marker.setAttribute("url",toy.marker_pattern_url)
        marker.setAttribute("cursor",{rayOrigin:"mouse"})
        marker.setAttribute("markerhandler",{})
        mainscene.appendChild(marker)
  
        var model = document.createElement("a-entity")
        model.setAttribute("id",`model-${toy.id}`)
        model.setAttribute("position",toy.model_geometry.position)
        model.setAttribute("rotation",toy.model_geometry.rotation)
        model.setAttribute("scale",toy.model_geometry.scale)
        model.setAttribute("gltf-model",`url(${toy.model_url})`)
        model.setAttribute("gesture-handler",{})
        marker.appendChild(model)
  
        var mainplane = document.createElement("a-plane")
        mainplane.setAttribute("id",`main-plane-${toy.id}`)
        mainplane.setAttribute("position",{x:0,y:0,z:0})
        mainplane.setAttribute("rotation",{x:-90,y:0,z:0})
        mainplane.setAttribute("width",1.7)
        mainplane.setAttribute("height",1.5)
        marker.appendChild(mainplane)
  
        var titleplane = document.createElement("a-plane")
        titleplane.setAttribute("id",`title-plane-${toy.id}`)
        titleplane.setAttribute("position",{x:0,y:0.89,z:0.02})
        titleplane.setAttribute("rotation",{x:0,y:0,z:0})
        titleplane.setAttribute("width",1.69)
        titleplane.setAttribute("height",0.3)
        titleplane.setAttribute("material",{color:"#f0c30f"})
        mainplane.appendChild(titleplane)
  
        var toytitle = document.createElement("a-entity")
        toytitle.setAttribute("id",`toy-title-${toy.id}`)
        toytitle.setAttribute("position",{x:0,y:0,z:0.1})
        toytitle.setAttribute("rotation",{x:0,y:0,z:0})
        toytitle.setAttribute("text",{
          font:"monoid",
          color:"black",
          width:1.8,
          height:1,
          align:"centre",
          value:toy.toy_name.toUpperCase()
        })
        titleplane.appendChild(toytitle)
  
        var age = document.createElement("a-entity")
        age.setAttribute("id",`age-${toy.id}`)
        age.setAttribute("position",{x:0.3,y:0,z:0.1})
        age.setAttribute("rotation",{x:0,y:0,z:0})
        age.setAttribute("text",{
          font:"monoid",
          color:"black",
          width:2,
          align:"left",
          value:"8-100yrs"
        })
        mainplane.appendChild(age)
      })
    },
    
    getAllToys: async function(){
      return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap=>{
        return snap.docs.map(doc=>doc.data())
      })
  
    }
    });
  