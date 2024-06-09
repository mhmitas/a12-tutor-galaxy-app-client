import React from 'react';
import useAuth from '../../../hooks/useAuth';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import useGetQuery from '../../../hooks/useGetQuery';

const TutorDashboard = () => {
    const { user } = useAuth()

    // ToDo: This method must be changed
    const [sessions, sessionsLoading] = useGetQuery('count-active-sessions', `/study-sessions/tutor/${user?.email}?status=approved`)

    return (
        <div>
            <header className='sm:block hidden'>
                <DashboardNavbar />
            </header>
            <main>
                <div>
                    <h3>Active Sessions: {sessions.length}</h3>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea repellendus dignissimos inventore eos molestiae fuga magni odit, nihil cum suscipit mollitia dolor voluptas reprehenderit laborum necessitatibus ad repellat qui facilis tempore distinctio. Blanditiis alias aut amet consequuntur, veritatis ea dolorum praesentium vero quidem officiis dolore, sapiente provident deserunt repellat, est tenetur vitae nobis suscipit sunt eum? Voluptatibus consectetur voluptas tenetur, ullam fuga itaque optio minus inventore laudantium nisi, rerum quas aut sunt porro veritatis maxime illum veniam autem eveniet similique mollitia ex sapiente voluptate? Repudiandae consequuntur totam, minima nulla fuga voluptate, suscipit voluptates et quaerat, quas molestias itaque. Iste corporis, ea distinctio molestiae temporibus itaque praesentium facere fuga vel exercitationem sit consequuntur dolores enim delectus fugiat autem obcaecati error reiciendis aperiam ex. Temporibus nobis corrupti cupiditate corporis dolore vel ratione vitae laborum quos ipsum ducimus esse blanditiis neque dolores accusantium accusamus eum officiis, ad voluptas aliquam aliquid? Itaque sapiente suscipit assumenda aperiam a nemo delectus ratione ipsum consequuntur unde, quae exercitationem nisi sunt neque natus officiis ducimus id fuga! Officiis expedita ipsa numquam molestiae maiores exercitationem laudantium labore sapiente debitis explicabo? Provident cupiditate maiores molestiae labore tempora itaque repellat? Aliquid animi veritatis vitae totam, dolores fugit eligendi quod dolore laudantium non dolor qui expedita distinctio eveniet, ducimus necessitatibus maxime nostrum minima commodi reiciendis impedit aspernatur! Ut, aut necessitatibus. Optio natus dolor explicabo non voluptatibus, neque cupiditate eaque ab, delectus distinctio ut in obcaecati totam nobis consequuntur saepe doloribus dignissimos porro nulla, minima corrupti quam ullam fugit. Harum natus ipsam mollitia quasi eius necessitatibus exercitationem? Qui, provident quas ab vel, ex nesciunt nostrum iure quia tenetur facilis officia velit repellat voluptate laudantium rerum reiciendis, aut molestias ducimus officiis accusantium debitis? Ipsa provident animi sunt quasi incidunt assumenda. Sequi ratione exercitationem, quas, consequatur voluptatibus, magnam temporibus sit suscipit iste dignissimos cumque! Inventore numquam fuga ducimus. Nobis molestias sed in animi corrupti placeat hic neque libero ducimus qui accusantium debitis, atque repudiandae alias quos! Illum molestiae nihil dolorum, iusto exercitationem nobis laboriosam? Eos necessitatibus maiores quae quidem iure, fugiat ea, doloribus soluta vitae nemo velit laboriosam explicabo est pariatur placeat perspiciatis. Animi veritatis quae ratione hic nam maiores officiis iure dolore, culpa, quisquam suscipit harum possimus laborum itaque nesciunt optio autem! Magnam facere ab ex? Assumenda commodi quia exercitationem, maxime aliquid officia, ex ut amet blanditiis facere dignissimos. Impedit quae nobis sapiente, accusamus pariatur sunt incidunt magnam assumenda dolore cupiditate, accusantium atque aut dicta repellat eveniet aspernatur! Inventore modi sunt at maxime. Aspernatur ab eaque quas cumque dicta, et dolorem itaque veniam tenetur voluptates nostrum possimus alias deleniti ex sequi? Animi quis incidunt velit voluptatem commodi facere, neque facilis ipsum quasi, ratione deleniti itaque sapiente recusandae consectetur! Nemo fugiat sunt blanditiis, exercitationem natus et at officia veniam, impedit qui maxime. Labore quidem maxime eos illo? Ex veniam qui tempore commodi nisi accusamus quasi optio id porro quos aliquam architecto adipisci ipsum voluptates animi aliquid distinctio laudantium, at, nostrum necessitatibus reiciendis est dolores. Ipsa deleniti cumque sunt nisi sit. Ipsam, nemo cupiditate. Possimus, amet.
            </main>
        </div>
    );
};

export default TutorDashboard;