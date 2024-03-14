"""empty message

<<<<<<<< HEAD:migrations/versions/3b18477a635b_.py
Revision ID: 3b18477a635b
Revises: 
Create Date: 2024-03-14 15:54:18.677836
========
Revision ID: 0e1732bf8437
Revises: 
Create Date: 2024-03-14 11:03:48.553620
>>>>>>>> Rocio:migrations/versions/0e1732bf8437_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/3b18477a635b_.py
revision = '3b18477a635b'
========
revision = '0e1732bf8437'
>>>>>>>> Rocio:migrations/versions/0e1732bf8437_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('user_name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favorite_profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_properties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('pet', sa.Enum('Yes', 'No', name='petchoice'), nullable=False),
    sa.Column('gender', sa.Enum('Male', 'Female', name='genderchoices'), nullable=False),
    sa.Column('budget', sa.Integer(), nullable=False),
    sa.Column('find_roomie', sa.Enum('Apartment', 'NoApartment', name='findroomiechoice'), nullable=False),
    sa.Column('text_box', sa.Text(), nullable=False),
    sa.Column('profile_img', sa.String(length=1000), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_properties')
    op.drop_table('favorite_profile')
    op.drop_table('user')
    # ### end Alembic commands ###
