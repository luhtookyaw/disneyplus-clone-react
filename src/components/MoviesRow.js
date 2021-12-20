import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { setMovies, selectRecommend, selectDisney, selectOriginal, selectTrending } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';
import { collection, getDocs } from 'firebase/firestore';

const MoviesRow = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const recommendedMovies = useSelector(selectRecommend);
    const newDisneyMovies = useSelector(selectDisney);
    const originalMovies = useSelector(selectOriginal);
    const trendingMovies = useSelector(selectTrending);

    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trendings = [];

    useEffect(async() => {
        const querySnapshot = await getDocs(collection(db, "movies"));
        querySnapshot.forEach((doc) => {
            switch(doc.data().type) {
                case 'recommend':
                    recommends = [...recommends, {id: doc.id, ...doc.data()}];
                    break;
                case 'new':
                    newDisneys = [...newDisneys, {id: doc.id, ...doc.data()}];
                    break;
                case 'original':
                    originals = [...originals, {id: doc.id, ...doc.data()}];
                    break;
                case 'trending':
                    trendings = [...trendings, {id: doc.id, ...doc.data()}];
                    break;
            }
        });
        dispatch(
            setMovies({
                recommend: recommends,
                newDisney: newDisneys,
                original: originals,
                trending: trendings,
            })
        );
    }, [userName]);
    return (
        <>
        <Container>
            <h4>Recommended for You</h4>
            <Content>
                {
                    recommendedMovies && recommendedMovies.map((movie, key) => (
                        <Wrap key={key}>
                            {movie.id}
                            <Link to={"/detail/" + movie.id }>
                                <img src={movie.cardImg} alt={movie.title}/>
                            </Link>
                        </Wrap>
                    ))
                }
            </Content>
        </Container>
        <Container>
            <h4>New to Disney+</h4>
            <Content>
                {
                    newDisneyMovies && newDisneyMovies.map((movie, key) => (
                        <Wrap key={key}>
                            {movie.id}
                            <Link to={"/detail/" + movie.id}>
                                <img src={movie.cardImg} alt={movie.title}/>
                            </Link>
                        </Wrap>
                    ))
                }
            </Content>
        </Container>
        <Container>
            <h4>Originals</h4>
            <Content>
                {
                    originalMovies && originalMovies.map((movie, key) => (
                        <Wrap key={key}>
                            {movie.id}
                            <Link to={"/detail/" + movie.id}>
                                <img src={movie.cardImg} alt={movie.title}/>
                            </Link>
                        </Wrap>
                    ))
                }
            </Content>
        </Container>
        <Container>
            <h4>Trending</h4>
            <Content>
                {
                    trendingMovies && trendingMovies.map((movie, key) => (
                        <Wrap key={key}>
                            {movie.id}
                            <Link to={"/detail/" + movie.id}>
                                <img src={movie.cardImg} alt={movie.title}/>
                            </Link>
                        </Wrap>
                    ))
                }
            </Content>
        </Container>
        </>
    );
}

const Container = styled.div`
    padding-bottom: 26px;
`;

const Content = styled.div`
    display: grid;
    gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const Wrap = styled.div`
    padding-top: 56.25%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);

    img {
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
    }

    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8); 
    }
`;

export default MoviesRow;