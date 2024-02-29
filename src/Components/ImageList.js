// imageList.js
import { useState } from "react";

export const useImageList = () => {
  const [imageList, setImageList] = useState(
    [
      {
        path: "https://a.cdn-hotels.com/gdcs/production84/d314/ef4c0fcd-c07e-41c2-b847-774f1eccaa73.jpg",
        name: "Retiro Park",
      },
      {
        path: "https://www.barcelonayellow.com/images/stories/hotel_la_vela/w_hotel_barcelona.jpg",
        name: "Barcelona Sea View",
      },
      {
        path: "https://www.visiteuropeancastles.com/wp-content/uploads/2022/05/Monasterio_de_El_Escorial-royal-palaces-spain.jpg",
        name: "Near the Palace",
      },
      {
        path: "https://2.bp.blogspot.com/-3dhq3vwJDQo/T_1nIm-MXNI/AAAAAAAAFzU/hJ3Ko_qPCMw/s800/IMG_2684.JPG",
        name: "View of Spain",
      },
      {
        path: "https://sevillecityguide.com/images/plazadeespana-seville.jpg",
        name: "Spanish Square",
      },
      {
        path: "https://www.spain.info/.content/imagenes/cabeceras-grandes/castilla-mancha/vistas-toledo-s535820527.jpg",
        name: "Charming Toledo",
      },
      {
        path: "https://www.spain.info/export/sites/segtur/.content/imagenes/rutas/ruta-toledo/vista-general-de-toledo-c-steven-yu.jpg_1014274486.jpg",
        name: "Toledo Skyline",
      },
      {
        path: "https://media.architecturaldigest.com/photos/585abd711f906f61574e60ad/1:1/w_1533,h_1533,c_limit/gothic-cathedrals-06.jpg",
        name: "Historic Cathedral",
      },
      {
        path: "https://images.squarespace-cdn.com/content/v1/58a7bf689de4bb32da4b36b8/1530051245184-CQS38PAJDSCR16QTWH3O/IMG_1335.jpg",
        name: "Pont Del Biseb",
      },
      {
        path: "https://ticketshop.barcelona/images/palaunacional.jpg",
        name: "Mountain of Montjuic",
      },
      {
        path: "https://media-cdn.tripadvisor.com/media/photo-s/07/35/87/0c/barnabeu.jpg",
        name: "Beautiful Barnbau",
      },
      {
        path: "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2022/11/18155727/Gran-Via.jpg",
        name: "GranVia",
      },
      {
        path: "https://cdn.britannica.com/72/132272-050-E4877C4C/Madrid-Spain.jpg",
        name: "Madird",
      },
      {
        path: "https://st4.depositphotos.com/3659429/31548/i/450/depositphotos_315486232-stock-photo-teatre-museum-of-salvador-dali.jpg",
        name: "Salvador-Dali-museum-figueres",
      },
    ].sort((a, b) => a.name.localeCompare(b.name))
  );

  return [imageList, setImageList];
};
