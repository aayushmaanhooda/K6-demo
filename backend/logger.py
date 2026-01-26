import logging

# Setup logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(filename)s:%(lineno)d - %(levelname)s - %(message)s"
)
def get_logger(name: str):
    return logging.getLogger(name)