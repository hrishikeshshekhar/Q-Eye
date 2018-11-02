# Q_EYE
A machine learning project to automate baggage screening in airports to increase security.
The project is build on top of Inception v3 by utilising transferred learning. The final 2 fully connected layers of the model
retrained with whatever image classes are provided to it.

# Dataset

The dataset we used was a german dataset with X-ray images of dangerous objects stored(http://dmery.ing.puc.cl/index.php/material/gdxray).
The dataset contained over 1000 images of X-rayed objects of relevance.

# UI Features
This project features a front end UI for users to drag and drop images to scan for threats. Further, it also possesses an app interface to 
push notifications or an alarm to security personnel if necessary.

# Result

The model acheived an accuracy of 95% but was limited due to the limited size of it's dataset. However, the model serves as proof of conept 
and shows that this can be implemented.

