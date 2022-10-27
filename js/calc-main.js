function CalcMain(d, inParams, outResult) {
    
    const self = this;
    inParams = inParams || {};
    outResult = outResult || {};
    
    inParams.listBtn = d.getElementsByClassName(inParams.listBtn);
    inParams.idRange = d.getElementById(inParams.idRange);
    
    this.compute = function() {
        var weight = parseInt(inParams.idRange.value);
        var basePrice = parseInt(inParams.listBtn[0].getAttribute("data-val"));
        var total;
        
        if (weight < 100) {
            total = basePrice * 1.6;
        } else if (weight > 100 && weight < 500) {
            total = basePrice * 1.2;
        } else if (weight > 500) {
            total = basePrice;
        }
        
        total *= parseFloat(inParams.listBtn[1].getAttribute("data-val"));
        total *= weight;
        
        d.getElementById(outResult.weight).textContent = weight || 1;
        d.getElementById(outResult.volume).textContent = (weight * 0.95).toFixed(2) || 0.95;
        d.getElementById(outResult.total).textContent = total;
    }
    
    this.btnAction = function(cls, attr) {
        var cont = d.getElementsByClassName(cls);
            for(var i = 0; i < cont.length; i++) {

                for(var n = 0; n < cont[i].children.length; n++) {
                    cont[i].children[n].addEventListener('click', function() {
                    if(this.hasAttribute(attr)) {
                        for(var j = 0; j < this.parentNode.children.length; j++) this.parentNode.children[j].setAttribute(attr, "");

                        this.setAttribute(attr, "active");
                        this.parentNode.setAttribute("data-val", this.hasAttribute("data-val") ? this.getAttribute("data-val") : "");
                    }
                        
                    self.compute();
                })
            }
        }
    }
    
    this.rangeAction = function(id, attr) {
        var range = d.getElementById(id);
        
        range.addEventListener('input', function() {
            self.compute();
        });
    }
}