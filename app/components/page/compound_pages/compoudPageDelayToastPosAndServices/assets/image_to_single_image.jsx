import Image from '../../../../image_for_page/image';
import tranUrlToLocal from '../../../../../lib/fetching/transUrlLocal';
import useFindArticle from '../../../../../hook/find_to_asidebar';
import TimeOperator from '../../../../../lib/time';




export default function ReturnImages({ delay, typeFood, getNewUrlImg }) {


    const { findNovelty } = useFindArticle();


    if (delay.length > 3) return null;
    const styleImg = {};
    if (delay.length === 1) {
        styleImg.width = '100%';
        styleImg.height = '330px'
    }
    else if (delay.length === 2) styleImg.height = '300px';
    else if (delay.length === 3) styleImg.height = '250px';


    return (
        <div className='flex justify-center items-center gap-4 w-full'>
            {
                delay.sort((a, b) => TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(b?.timePeriod?.init, b?.timePeriod?.end)) - TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(a?.timePeriod?.init, a?.timePeriod?.end))).map((delay, index) => (
                    <Image
                        item={index}
                        style={styleImg}
                        setSrc={tranUrlToLocal(delay.imageToShare)}
                        getFile={data => getNewUrlImg(data, delay)}
                        index={index}
                        arrowCordernate={false}
                        caption={delay.length === 1 ? null : `Mesa: ${delay.table}`}
                        key={index}
                        boubleClickEvent={() => findNovelty(delay._id)}
                    />
                ))
            }
        </div>
    );
};