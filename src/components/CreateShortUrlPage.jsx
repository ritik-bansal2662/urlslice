import { useState } from 'react'
import TextField from './TextField';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion'
import api from '../api/api'
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';
import Loader from '../components/Loader'
import ShortenUrlList from './Dashboard/ShortenUrlList';
import { Link } from 'react-router-dom';
import BackgroundWords from './BackgoundWords';

const CreateShortUrlPage = () => {
    const [loading, setLoading] = useState(false)
    const { token } = useStoreContext()

    const [showUrlBlock, setShowUrlBlock] = useState(false) 
    const [shortItemsList, setShortItemsList] = useState([]) 
    
    
    const {
          register,
          handleSubmit,
          reset,
          formState : { errors },
          watch
        } = useForm({
          defaultValues: {
            originalUrl: "",
            customShortUrl: "",
          },
          mode: "onTouched",
        })
    
    const createRandomShortUrlHandler = async () => {
        const originalUrl = watch("originalUrl");
        const data = { originalUrl: originalUrl }
        console.log("Submitting first field:", data);
        setLoading(true)
        setShowUrlBlock(false)
        console.log(data);
        
        try{
            let res;
            if(token) { // if logged in
                const { data: response} = await api.post("/api/urls/shorten", data, {
                    headers: {
                        "Content-Type" : "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    }
                })
                res = response
            } else { // if not logged in
                const { data: response} = await api.post("/api/auth/public/shorten", data, {
                    headers: {
                        "Content-Type" : "application/json",
                        Accept: "application/json",
                    }
                })
                res = response
            } 
    
            const shortenUrl = `${import.meta.env.VITE_REACT_SUBSOMAIN}/${res.shortUrl}`
            navigator.clipboard.writeText(shortenUrl).then(() => {
                toast.success("Short URL Copied to Clipboard.", {
                    position: "bottom-center",
                    className: "mb-5",
                    duration: 3000,
                })
            })

            setShowUrlBlock(true)

            setShortItemsList((prev) => [
                ...prev, 
                {
                    id: res.id,
                    originalUrl:data.originalUrl,
                    shortUrl:res.shortUrl,
                    clickCount:res.clickCount,
                    createdDate:res.createDate,
                    showAnalytics:false,
                }
            ])
    
            // await refetch()
            reset()
    
        } catch (err) {
            console.log(err);
            toast.error("Create short URL failed.")
        } finally {
            setLoading(false)
        }
        // Perform API call or other logic here
    };
    
    const createCustomShortUrlHandler = async (data) => {
        console.log(data);
        
        if(!token) {
            toast.error("Kindly Login to create a custom URL or else you can create a random URL.")
            return;
        }
        if(data.customShortUrl == "") {
            toast.error("Please enter self defined link to create a custom URL.")
            return;
        }
        
        setLoading(true)
        setShowUrlBlock(false)
    
        try{
            const { data: res} = await api.post("/api/urls/shorten", data, {
                headers: {
                    "Content-Type" : "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })

            console.log('response: ', res);
            
    
            const shortenUrl = `${import.meta.env.VITE_REACT_SUBSOMAIN}/${res.shortUrl}`
            navigator.clipboard.writeText(shortenUrl).then(() => {
                toast.success("Short URL Created and Copied to Clipboard.", {
                    position: "bottom-center",
                    className: "mb-5",
                    duration: 3000,
                })
            })

            setShowUrlBlock(true)
            setShortItemsList((prev) => [
                ...prev, 
                {
                    id: res.id,
                    originalUrl:data.originalUrl,
                    shortUrl:res.shortUrl,
                    clickCount:res.clickCount,
                    createdDate:res.createDate,
                    showAnalytics:false,
                }
            ])
    
            // await refetch()
            reset()
    
        } catch (error) {
            console.log(error);
            // toast.error(error.message)
            if (error.response) {
                // Server responded with a status code outside 2xx
                console.error("Error Response:", error.response.data);
                console.error("Status Code:", error.response.status);
                if(error.response.status == 409) {
                    toast.error("Custom short URL already exists, try anything else.")
                }
            } else if (error.request) {
                // Request was made, but no response received
                toast.error("No response received.")
            } else {
                // Something else happened while setting up the request
                toast.error("Create short URL failed.")
            }
        } finally {
            setLoading(false)
        }
    }
  
    return (
      <div className="relative min-h-screen">
        {/* <BackgroundWords /> */}
        <div className="relative w-full p-1 sm:p-8 mt-10 bg-[#fff9ec]">
            <form className='w-full max-w-3xl rounded-xl m-auto p-2 sm:p-8'>
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shorten new URL</h1>
                <div className="flex flex-col gap-1 flex-1 mt-4 justify-center items-center">
                    <div className="mb-5 w-full">
                        <div>
                            <TextField
                                label="Enter URL"
                                required
                                id="originalUrl"
                                placeholder="https://example.com"
                                type="url"
                                message="Url is required"
                                register={register}
                                errors={errors}
                            />
                        </div>
                    </div>
        
                    <div className="relative w-full max-w-3xl">
                        <div className="absolute top-10 left-0 flex items-center pl-4 pointer-events-none">
                            <span className="text-gray-500">{import.meta.env.VITE_REACT_SUBSOMAIN}/</span>
                        </div>
                        <TextField
                            label="Enter Custom Short URL"
                            id="customShortUrl"
                            placeholder="myResume"
                            type="text"
                            message="Url is required"
                            register={register}
                            errors={errors}
                            isSlug={true}
                            inputClassName = 'pl-[12.5rem] pr-4 py-2.5'
                        />
                    </div>
                </div>
    
                <div className="flex flex-col sm:flex-row gap-1 flex-1 mt-4 justify-center">
                    <motion.button 
                        initial={{ opacity:0, y:80 }}
                        whileInView={{
                            opacity:1,
                            y:0
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        onClick={handleSubmit(createCustomShortUrlHandler)}
                        type='button'
                        className='bg-custom-gradient w-full sm:w-60 text-white rounded-md py-2'
                    >
                        Create Custom Short Link
                    </motion.button>
                    <motion.button 
                        initial={{ opacity:0, y:80 }}
                        whileInView={{
                            opacity:1,
                            y:0
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        onClick={createRandomShortUrlHandler}
                        type='button'
                        className='border border-btnColor w-full sm:w-60 text-btnColor rounded-md py-2'
                    >
                        Create Random Short Link
                    </motion.button>
                    <motion.span 
                        initial={{ opacity:0, y:80 }}
                        whileInView={{
                            opacity:1,
                            y:0
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='border border-btnColor w-full sm:w-60 text-btnColor text-center rounded-md py-2'
                    >
                        <Link to='/dashboard' className='mx-auto'>
                            Dashboard
                        </Link>
                    </motion.span>
                </div>
            </form>
        </div>
        { loading && <Loader />}
        { showUrlBlock && (
            <div className="lg:w-[90%] w-full mx-auto py-16">
            <ShortenUrlList  data={shortItemsList} />
            </div> 
        )}
    </div>
      
  )
}

export default CreateShortUrlPage