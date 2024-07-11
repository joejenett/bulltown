#!/usr/bin/perl

# $data, $content 

    $fields = 2; 
    $filename = "covers.txt";
    $results = 1; 

    $home = "/covers";               

read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
   if (length($buffer) < 5) {
         $buffer = $ENV{QUERY_STRING};
    }

@pairs = split(/&/, $buffer);

foreach $pair (@pairs) {
   ($name, $value) = split(/=/, $pair);

   $value =~ tr/+/ /;
   $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
   $FORM{$name} = $value;
}
   
    $image = $FORM{'image'};

    &open_file("FILE1","",$filename);



$counter=0;
while (($line = &read_file("FILE1")) && ($counter < $results)) {
         # split the fields at the | character     
         @tabledata = split(/\s*\|\s*/,$line ,$fields);
          &check_record;
          if ($found == 1) {
            $counter++;
            &print_record;
          }

    }


close(FILE1);

if ($counter == 0) {
	print "Content-type: text/html\n\n";
	print "Location: 'https://bulltown.2022.jenett.org/covers/'\n\n";
	exit;
}

sub print_record {
       
	print "Content-type: text/html\n\n";
	print "$content \n";
	print "\n";

}


sub check_record {
    # get the data from the record read from the file. $tabledata

   $data = $tabledata[0];
   $content = $tabledata[1];
   chop($content);

   $searchline = $data;


   $sfound = 0;
   $found = 0;
   $notfound = 1; 

   $stlen = length($image);
   if ($stlen > 1) {
       @words = split(/ +/,$image);
        foreach $aword (@words) {
           if ($searchline =~ /\b$aword/i) {
                  $sfound = 1;
           } 
           else {
                  $notfound = 0;
            }
         }
     }
    if ($sfound == 1 && $notfound == 1) {
        $found = 1;
     }

    if ($stlen <= 1) {
        $found = 1;
    }
    #if page doesn't have a title then return not found
    $tlen = length($content);
    if ($tlen < 1) {
        $found = 0;
    }
}

sub open_file {

  local ($filevar, $filemode, $filename) = @_;
  
  open ($filevar,$filemode . $filename) ||
     die ("Can't open $filename");
}

sub read_file {

  local ($filevar) = @_;

  <$filevar>;  
}

sub write_file {

  local ($filevar, $line) = @_;

  print $filevar ($line);
}



