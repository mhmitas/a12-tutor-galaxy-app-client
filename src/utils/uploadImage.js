import axios from "axios";

// this function will take an image file
const uploadImage = async (image) => {
    const imageInfo = { image: image }
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, imageInfo, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const imageUrl = res.data.data.display_url
    // console.log(imageUrl)
    return imageUrl
};

export default uploadImage;