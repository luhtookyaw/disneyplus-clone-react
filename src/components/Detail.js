import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';

const Detail = () => {
    const { id } = useParams();
    const [ detailData, setDetailData ] = useState({});

    useEffect(async() => {
        const docSnap = await getDoc(doc(db, "movies", id));

        if (docSnap.exists()) {
            setDetailData(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }, [id]);

    return (
        <Container>
            <Background>
                <img src={detailData.backgroundImg} alt={detailData.title}/>
            </Background>
            <ImageTitle> 
                <img src={detailData.titleImg} alt={detailData.title}/>
            </ImageTitle>
            <ContentMeta>
                <Controls>
                    <Player>
                        <img src="/images/play-icon-black.png" alt=""/>
                        <span>Play</span>
                    </Player>
                    <Trailer>
                        <img src="/images/play-icon-white.png" alt=""/>
                        <span>Trailer</span>
                    </Trailer>
                    <AddList>
                        <span/>
                        <span/>
                    </AddList>
                    <GroupWatch>
                        <img src="/images/group-icon.png" alt=""/>
                    </GroupWatch>
                </Controls>
                <SubTitle>
                    {detailData.subTitle}
                </SubTitle>
                <Description>
                    {detailData.description}
                </Description>
            </ContentMeta>
        </Container>
    );
}

const Container = styled.div`
    top: 72px;
    position: relative;
    min-height: calc(100vh-250px);
    overflow-x: hidden;
    display: block;
    padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
    inset: 0;
    opacity: 0.8;
    position: fixed;
    z-index: -1;

    img {
        width: 100vw;
        height: 100vh;
        
        @media (max-width: 769px) {
            width: initial;
        }
    }
`;

const ImageTitle = styled.div`
    align-items: flex-end;
    display: flex;
    justify-content: flex-start;
    margin: 0px auto;
    height: 30vw;
    min-height: 170px;
    padding-bottom: 24px;
    width: 100%;

    img {
        max-width: 600px;
        min-width: 200px;
        width: 35vw;
    }
`;

const ContentMeta = styled.div`
    max-width: 874px;
`;

const Controls = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    margin: 24px 0px;
    min-height: 56px;
`;

const Player = styled.div`
    color: black;
    margin: 0px 22px 0px 0px;
    padding: 0px 24px;
    height: 56px;
    border-radius: 4px;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    background: rgb(249, 249, 249);

    img {
        width: 32px;
    }

    &:hover {
        background: rgb(198, 198, 198);
    }

    @media (max-width: 768px) {
        height: 45px;
        padding: 0px 22px;
        font-size: 15px;
        margin: 0px 10px 0px 0px;
        img {
            width: 25px;
        }
    }
`;

const Trailer = styled(Player)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
`;

const AddList = styled.div`
    margin-right: 16px;
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;

    span {
        background-color: rgba(249, 249, 249);
        display: inline-block;
        &:first-child {
            height: 2px;
            transform: translate(1px, 0px) rotate(0deg);
            width: 16px;
        }

        &:last-child {
            height: 16px;
            transform: translateX(-8px) rotate(0deg);
            width: 2px;
        }
    }
    @media (max-width: 375px) {
        margin-top: 15px;
        margin-left: 8px;
    }
`;

const GroupWatch = styled(AddList)`
    img {
        width: 100%;
    }
`;

const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    min-height: 20px;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    padding: 16px 0px;
    color: rgb(249, 249, 249);

    @media (max-width: 768px) {
        font-size: 17px;
    }
`;
export default Detail;