
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';


const Form = () => {


    const { register, formState: { errors }, handleSubmit } = useForm()
    
    const handleClick = data => {
        console.log(data);
        const booking = {
            name: data.name,
            selector: data.selector
        }
        fetch('https://coding-challenge-server-sable.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success('added successfully')
               window.location.reload()

            })

    }
    return (
        <div>

            <div className='w-96 p-8 card  rounded-lg'>
                <form onSubmit={handleSubmit(handleClick)}>


                    <div className="form-control w-full max-w-xs mb-3">

                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" className="input input-bordered w-full max-w-xs" {...register("name", { required: "Name is required" })} />
                        {errors.name && <p className='text-red-700' role="alert">{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">

                        <label className="label"><span className="label-text">Select your Profession</span></label>
                        <select name='selector' className="select select-bordered w-full"{...register("selector", { required: "select your industry" })}>

                            <option>Steel</option>
                            <option>Manufacture</option>
                            <option>Import</option>
                            <option>Export</option>
                            <option>IT</option>
                            <option>Consultant</option>
                        </select>

                        {errors.selector && <p className='text-red-700' role="alert">{errors.selector?.message}</p>}
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <input type="checkbox" className="checkbox checkbox-accent" />
                                <span className="label-text ml-3">Agree To Our Terms & Conditions</span>

                            </label>
                        </div>


                    </div>

                    <input className='btn btn-accent text-white w-full' value="Submit" type="submit" />

                </form>



            </div>

        </div>
    );
};

export default Form;