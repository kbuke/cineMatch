from models import Media, Movies, TvShows, Genres, MediaGenres, Users, UsersGenres

from app import app 
from config import db 

from datetime import date

import os

from dotenv import load_dotenv
load_dotenv()


if __name__=="__main__":
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()
        print("Begin seeding")

        print("Seeding films")
        lotr1=Movies(
            name="The Lord of the Rings",
            sub_title="The Fellowship of the Ring",
            poster="https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
            release_date=date(2001, 12, 15),
            summary="A hobbit is trying to destroy some ring.",
            media_type="Movie",
            background_image="https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/12/Lord-of-the-Rings-Rivendell.jpg",
            origin_country="New Zealand",
            run_time_hours=3,
            run_time_minutes=15
        )
        db.session.add_all([lotr1])
        db.session.commit()

        print("Seeding tv shows")
        got=TvShows(
            name="Game of Thrones",
            poster="https://egoamo.co.za/cdn/shop/products/PP34200_-_GoT_-_John_Snow_-_Winter_is_here_800x.jpg?v=1558992556",
            release_date=date(2011, 4, 18),
            summary="Royal families battle for the Iron Throne in Westeros. While in the north of the continent an ancient threat looms.",
            media_type="TV Programme",
            background_image="https://variety.com/wp-content/uploads/2019/05/game-of-thrones-season-6-episode-9.jpg",
            origin_country="USA",
            end_date=date(2019, 5, 20)
        )
        db.session.add_all([got])
        db.session.commit()

        print("Seeding Genres")
        fantasy=Genres(
            genre="Fantasy",
            image="https://wellingtonnz.bynder.com/transform/d6a2359f-531b-4e5e-ab10-559531ecc4d3/Lord-of-the-Rings"
        )
        action=Genres(
            genre="Action",
            image="https://images-r2-1.thebrag.com/var/uploads/2024/05/furiosa-trailer.jpg"
        )
        sci_fi_genre=Genres(
            genre="Sci-Fi",
            image="https://miro.medium.com/v2/1*P1FNZKHzA9w7UHhumCZezg.jpeg"
        )
        animation=Genres(
            genre="Animation",
            image="https://static01.nyt.com/images/2024/09/22/multimedia/22wild-robot-design-jcbg/22wild-robot-design-jcbg-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
        )
        anime=Genres(
            genre="Anime",
            image="https://static1.srcdn.com/wordpress/wp-content/uploads/2023/11/levi-ackerman-attack-on-titan.jpg"
        )
        chick_flick=Genres(
            genre="Chick Flick",
            image="https://lh6.googleusercontent.com/proxy/ODMYF5Y8ay5V2SLBD0KvgtWHHTMFLccpZYStjRdsB0glRu-pB9azVp_T-zXOBrBP8C7WpC9dINPIe1s5_sUi_OJ5tP1fLEGXbtwWZEi8Wtazj_drVIhkVwhU1JrHcCqEAnSA4Md6LII"
        )
        thriller=Genres(
            genre="Thriller",
            image="https://images.bauerhosting.com/legacy/media/6026/a037/4ef6/302f/a23a/5c22/sotl-3.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80"
        )
        comedy=Genres(
            genre="Comedy",
            image="https://m.media-amazon.com/images/M/MV5BMjEwOTE1MDA5MV5BMl5BanBnXkFtZTcwMjUwMzIyMw@@._V1_.jpg"
        )
        war=Genres(
            genre="War",
            image="https://ychef.files.bbci.co.uk/1280x720/p0j2dzgq.jpg"
        )
        db.session.add_all([fantasy, war, thriller, action, sci_fi_genre, animation, animation, anime, comedy, chick_flick])
        db.session.commit()

        print("Seeding film genres")
        lotr1_fantasy=MediaGenres(
            media_id=1,
            genre_id=1
        )
        lotr1_action=MediaGenres(
            media_id=1,
            genre_id=1
        )
        got_fantasy=MediaGenres(
            media_id=2,
            genre_id=1
        )
        got_action=MediaGenres(
            media_id=2,
            genre_id=2
        )
        db.session.add_all([lotr1_action, lotr1_fantasy, got_fantasy, got_action])
        db.session.commit()

        print("Seeding users")
        kaan_user=Users(
            email=os.environ.get("kaan_email"),
            first_name="Kaan",
            last_name="Buke",
            user_type="Viewer",
            city="London"
        )
        kaan_user.password_hash=os.environ.get("kaan_password")
        
        anya_taylor=Users(
            email="anya@gmail.com",
            first_name="Anya",
            last_name="Taylor Joy",
            user_type="Actor",
            city="London"
        )
        anya_taylor.password_hash="queenGambit"
        db.session.add_all([kaan_user, anya_taylor])
        db.session.commit()

        print("Seeding users fave genres")
        kaan_fave_fantasy=UsersGenres(
            user_id=1,
            genre_id=1
        )
        kaan_fave_action=UsersGenres(
            user_id=1,
            genre_id=2
        )
        db.session.add_all([kaan_fave_action, kaan_fave_fantasy])
        db.session.commit()
        
