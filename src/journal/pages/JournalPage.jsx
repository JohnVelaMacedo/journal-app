import JournalLayout from '../layout/JournalLayout'
import NothingSelectedView from '../views/NothingSelectedView'

function JournalPage() {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
        sunt quaerat totam delectus quibusdam? Repellat deserunt
        reiciendis sed possimus reprehenderit! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Unde eligendi molestias
        recusandae veritatis, neque quod nobis magni alias quia ipsa
        id veniam aliquid voluptate officia ipsam nemo nihil ipsum
        maxime dolores? Sit vitae alias et est officia obcaecati,
        molestias, placeat aut praesentium nulla reprehenderit
        deserunt? Ducimus dolorem facilis eos magnam? Error porro
        nobis dolor vel ab aliquid, perferendis, ducimus, numquam
        beatae esse deserunt corrupti molestiae voluptatibus rem
        debitis nihil illum earum! Velit, mollitia dolorem. Magnam
        iusto nostrum, nisi sunt dolor itaque perferendis magni
        laborum repellat impedit, rerum labore ullam. Non incidunt
        dolore commodi atque labore eveniet unde quidem ad nostrum.
      </Typography> */}

      <NothingSelectedView />

      {/* <NoteView />

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton> */}
    </JournalLayout>
  )
}

export default JournalPage
