from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
theme = root / "lit-editorial"
output = root / "dist" / "lit-editorial.zip"
output.parent.mkdir(exist_ok=True)
with ZipFile(output, "w", ZIP_DEFLATED) as archive:
    for source in sorted(theme.rglob("*")):
        if source.is_file() and not source.name.startswith("."):
            archive.write(source, source.relative_to(theme))
print(output)
