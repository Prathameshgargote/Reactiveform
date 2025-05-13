export class CustomRegex {
     static password = `^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{7,}$`;
     static passwordPattern ='/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/';
     static onlyText = '[a-zA-Z]*';
     static employeeid = '[A-Z][0-9]{3}'
     static username = '^[a-zA-Z ]*$';
     static empId = '^[A-Z]\d+$';
     static email = '^[a-zA-Z0-9.-]+@[a-zA-Z0-9-.]+\\.[a-zA-Z]{2,100}$';
     static updateEmail ='/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,9}))$/';
     static pincode = '^[1-9][0-9]{5}$'
  }