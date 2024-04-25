export type TypeDataCard = {
      id: number,
      image: string,
      href: string,
      sticker?: string,
      promotion: number,
      brand: string,
      title: string,
      price: number,
      size ?: string,
      photos ?: string,
      logo ?: string,
      productSizes?: string,
      description?: string,
      descriptionSanitized?: string,
      category: string
}

export type TypeDataFetch = {
        data?: TypeDataCard[],
        offset: number,
        length: number,
        message: string    
} 

export type PropsBasket = {
      id?: number,
      image?: string,
      href?: string,
      sticker?: string,
      promotion?: string,
      brand?: string,
      title: string,
      price: number,
      size?: string,
      photos?: string,
      logo?: string,
      category: string,
      sizeChoice?: string,
      quantity: number,
    };

    
export type propsOrder = {
        Nom: string,
        Prenom: string,
        adress_facturation: string,
        adress_livraison: string,
        city: string,
        zip_code: string,
        mail: string,
        phone?: string,
        adress_comp?: string,
        data: PropsBasket[]
    }

    export type propsUserInfos = {
      email: string;
      lastName: string;
      firstName: string;
      genre: string;
      date_day: string;
      date_month: string;
      date_year: string;
      id: string;
      products: propsOrder[] | never[]
    };   
