use std::fs::File;
use tar::Archive;
use flate2::read::GzDecoder;

fn main() -> Result<(), std::io::Error>{
    let file = File::open("archive.tar.gz")?;
    let tar = GzDecoder::new(file);
    let mut archive = Archive::new(tar);
    archive.unpack(".")?;
    Ok(())
}
