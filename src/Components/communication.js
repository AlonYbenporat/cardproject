function Communication({getEmail,Whatsapp,phone}){
    return(
        <div >
        
            <a href={`mailto:alon.benporat@gmail.com${getEmail}`} className= "btn btn-light m-3">
                <i class="bi bi-envelope-arrow-down-fill me-1"></i>
                {getEmail}
            </a>
                 
    
    
            <a href={`https://wa.me/${Whatsapp}`} className= "btn btn-light m-3">
                <i  class="bi bi-whatsapp me-1"></i>
                {Whatsapp}
            </a>
           
   
    
        
            <a href={`tel:${phone}`} className= "btn btn-light m-3 ">
                <i class="bi bi-telephone me-1"></i>
                {phone}
            </a>
                 
   
    </div>
    );
}
export default Communication;