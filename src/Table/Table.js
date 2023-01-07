import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../ConfirmationModal';


const Table = () => {
    const [deletingBooking, setDeletingBooking] = useState(null);

    const closeModal = () => {
      setDeletingBooking(null);
  }


    const { data: booking,  refetch } = useQuery({
        queryKey: ['booking'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/booking', {
                    headers: {
                      'content-type': 'application/json', 
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    
    const handleDeleteDoctor = booking => {
        fetch(`http://localhost:5000/booking/${booking._id}`, {
            method: 'DELETE', 
            headers: {
              'content-type': 'application/json', 
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`${booking.name} deleted successfully`)
            }
        })
    }

    

    return (
        <div>
           
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                          
                            <th>Name</th>
                            <th>Sector</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                            
                                <td>{booking.name}</td>
                                <td>{booking.selector}</td>
                                
                                <td>
                                    <label onClick={() => setDeletingBooking(booking)} htmlFor="confirmation-modal"  className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingBooking && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingBooking.name}. It cannot be undone.`}
                    successAction = {handleDeleteDoctor}
                    successButtonName="Delete"
                    modalData = {deletingBooking}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }
           
        </div>
    );
};

export default Table;