import React from 'react';
import Heading from '../../../components/common/Heading';

const FaqHome = () => {
    return (
        <div className='pt-4 pb-8'>
            <Heading heading={'FAQs'} />
            <div className='bg-base-100 shadow-md rounded-md'>
                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        What sessions are available on this platform?
                    </div>
                    <div className="collapse-content">
                        <p>We offer a wide range of sessions across various subjects including science, technology, engineering, mathematics, humanities, and more. You can browse our session catalog to find the ones that interest you.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How do I book in a session?
                    </div>
                    <div className="collapse-content">
                        <p>To book in a session, you need to create an account and log in. Once logged in, you can browse the sessions and click on the "book" button to sign up for the session of your choice.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Are the sessions free?
                    </div>
                    <div className="collapse-content">
                        <p>We offer both free and paid sessions. Each session description will indicate whether it is free or if there is a fee associated with it. Some premium sessions may require a subscription or a one-time payment.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Can I get a certificate after completing a session?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, upon successful completion of a session, you will receive a certificate of completion. The certificate can be downloaded and shared as a testament to your learning.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How can I contact my instructor?
                    </div>
                    <div className="collapse-content">
                        <p>You can contact your instructor through the session's messaging system or discussion forums. Instructors may also provide their contact details or office hours within the session materials.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        What if I have technical issues?
                    </div>
                    <div className="collapse-content">
                        <p>If you encounter technical issues, please visit our Help Center for troubleshooting guides. You can also contact our support team directly through the "Contact Us" page for further assistance.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FaqHome;