from models import Media, Movies, TvShows, Genres, MediaGenres

from app import app 
from config import db 

from datetime import date

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

        print("Seeding Genres")
        fantasy=Genres(
            genre="Fantasy",
        )
        action=Genres(
            genre="Action",
        )
        db.session.add_all([fantasy, action])
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
        db.session.add_all([lotr1_action, lotr1_fantasy])
        db.session.commit()
        
