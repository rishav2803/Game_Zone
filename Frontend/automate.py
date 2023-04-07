from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
import time

#Initialize the chrome webdriver
options=webdriver.ChromeOptions()
options.add_experimental_option("detach",True)
PATH=r"C:\Users\riyat\OneDrive\Desktop\Rishav\chromedriver.exe"
service = ChromeService(executable_path=PATH)
driver = webdriver.Chrome(options=options,service=service)
driver.get("http://localhost:5173/test")

userName="Rishav"
optionSelected="computer"

username_input_box=driver.find_element("name", "userName")
submit_button=driver.find_element("name","submit")
option_box=driver.find_element("id",optionSelected)
try:
option_box= WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "computer")))
finally:
username_input_box.clear()
username_input_box.send_keys(userName)
time.sleep(2)
submit_button.click()
time.sleep(2)
option_box.click()
driver.close()
