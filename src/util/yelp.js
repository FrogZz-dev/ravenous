const apiKey = '8IuCgthUU9uYtzkkKjIoH9US_e_Zfj0fp8k9zOe9lHeYkqsZ67HJekwTkAxxscdsKxTGbc6cJg1Ta5wPqNzRmvkprHOE7fQh2XzJfXPwAPVfA2JMwytXI1K9MPhsX3Yx';

const Yelp = {



    search(term, location, sortBy) {
        const endpoint = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        const cors = 'https://cors-anywhere.herokuapp.com/';
        
        return fetch(cors + endpoint, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Request failed');
            }, networkError => {
                console.log(networkError.message)})
            .then(jsonResponse => {
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => {
                        
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories[0].title,
                            rating: business.rating,
                            reviewCount: business.review_count,
                            websiteUrl: business.url
                        }
                    });
                }
            })
            .catch(error => console.error(error.message));
    }
}

export default Yelp;