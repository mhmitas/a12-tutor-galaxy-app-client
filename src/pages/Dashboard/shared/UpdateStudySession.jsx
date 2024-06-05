import { useNavigate } from "react-router-dom";
import Heading from "../../../components/common/Heading";
import Container from "../../../components/shared/Container";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";

const UpdateStudySession = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { register, handleSubmit, reset } = useForm()


    async function onSubmit(data, event) {
        const form = event.target;
        const regStart = form.regStart.value;
        const regEnd = form.regEnd.value;
        const startDate = form.startDate.value;
        const endDate = form.endDate.value;
        const registrationDuration = { regStart, regEnd }
        const classDuration = { startDate, endDate }
        console.log(registrationDuration, classDuration);

        return
        let thumbnail_image = 'https://i.ibb.co/fGVzbks/default-learning.jpg'
        const ThumbnailImage = { image: data.thumbnail_image[0] }
        try {
            // upload img in img-bb
            if (data.thumbnail_image[0]) {
                const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, ThumbnailImage, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                thumbnail_image = imgbbRes.data.data.display_url
            }
            const sessionInfo = { ...data, classDuration, registrationDuration, status: 'pending', thumbnail_image }
            // post on database
            const res = await axiosSecure.post('/study-sessions', sessionInfo)
            console.log(res.data);
            toast.success('Session created. Please wait admins will respond soon')
            reset()
            navigate(-1)
        } catch (err) {
            console.error(err);
        }

        // console.table({ ...data, classDuration, registrationDuration, status: 'pending', thumbnail_image });
    }


    return (
        <Container>
            <Heading heading="Update Study Session" />
            <section className='mt-8 mb-20'>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 sm:grid-cols-2 gap-6 bg-base-100 p-8 max-w-screen-lg mx-auto rounded-md overflow-x-auto'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tutor Name</span>
                        </label>
                        <input {...register('tutor_name')} readOnly defaultValue={user?.displayName} type="text" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tutor Email</span>
                        </label>
                        <input {...register('tutor_email')} readOnly defaultValue={user?.email} type="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Session Title</span>
                        </label>
                        <input {...register('session_title')} type="text" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Session Duration</span>
                        </label>
                        <input {...register('session_duration')} type="text" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Registration Fee</span>
                        </label>
                        <input {...register('registration_fee')} defaultValue={0} readOnly type="text" className="input input-bordered" required />
                    </div>
                    {/* registration duration */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Registration Start Date</span>
                        </label>
                        <input name="regStart" type="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Registration End Date</span>
                        </label>
                        <input name="regEnd" type="date" className="input input-bordered" />
                    </div>
                    {/* <div className="divider divider-horizontal hidden md:flex"></div> */}
                    {/* class start to end date duration */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Class Start Date</span>
                        </label>
                        <input name="endDate" type="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Class End Date</span>
                        </label>
                        <input name="startDate" type="date" className="input input-bordered" />
                    </div>
                    <div className='text-center w-full'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Choose a Image</span>
                            </div>
                            <input {...register('thumbnail_image')} type="file" className="file-input file-input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control sm:col-span-2">
                        <label className="label">
                            <span className="label-text">Session Description</span>
                        </label>
                        <textarea required {...register('session_description')} className="textarea textarea-bordered" placeholder="About session"></textarea>
                    </div>

                    <div className='text-center w-full sm:col-span-2 mt-8'>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </section>
        </Container>
    );
};

export default UpdateStudySession

// async function onSubmit(data, event) {
//     const form = event.target;
//     const regStart = form.regStart.value;
//     const regEnd = form.regEnd.value;
//     const startDate = form.startDate.value;
//     const endDate = form.endDate.value;
//     const registrationDuration = { regStart, regEnd }
//     const classDuration = { startDate, endDate }
//     console.log(registrationDuration, classDuration);

//     return
//     let thumbnail_image = 'https://i.ibb.co/fGVzbks/default-learning.jpg'
//     const ThumbnailImage = { image: data.thumbnail_image[0] }
//     try {
//         // upload img in img-bb
//         if (data.thumbnail_image[0]) {
//             const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, ThumbnailImage, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             })
//             thumbnail_image = imgbbRes.data.data.display_url
//         }
//         const sessionInfo = { ...data, classDuration, registrationDuration, status: 'pending', thumbnail_image }
//         // post on database
//         const res = await axiosSecure.post('/study-sessions', sessionInfo)
//         console.log(res.data);
//         toast.success('Session created. Please wait admins will respond soon')
//         reset()
//         navigate(-1)
//     } catch (err) {
//         console.error(err);
//     }

//     // console.table({ ...data, classDuration, registrationDuration, status: 'pending', thumbnail_image });
// }