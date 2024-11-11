"""create a followers model

Revision ID: 6136753225f0
Revises: 2b87416a7105
Create Date: 2024-11-11 16:16:08.858995

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6136753225f0'
down_revision = '2b87416a7105'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('follows_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], name=op.f('fk_follows_follower_id_users')),
    sa.ForeignKeyConstraint(['follows_id'], ['users.id'], name=op.f('fk_follows_follows_id_users')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('follower_id', 'follows_id', name='unique_follows')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follows')
    # ### end Alembic commands ###