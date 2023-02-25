use std::fs::File;
use flate2::Compression;
use flate2::write::GzEncoder;

fn main() -> Result<(), std::io::Error>{
    let file = File::create("archive.tar.gz")?;
    let enc = GzEncoder::new(file, Compression::default());
    let mut tar = tar::Builder::new(enc);
    tar.append_dir_all("src", ".")?;
    Ok(())
} 
